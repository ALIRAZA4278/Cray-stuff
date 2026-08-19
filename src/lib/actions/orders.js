"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin-auth";
import { incrementDiscountUse, validateDiscount } from "@/lib/actions/discounts";
import { honoredOffersForEmail } from "@/lib/offers";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

const ORDER_STATUSES = ["New", "Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

// Admin-only: change an order's status. Reflected in the admin tables and the
// customer's order tracker.
export async function updateOrderStatus(id, status) {
  if (!(await isAdmin())) return { error: "Not authorized." };
  if (!ORDER_STATUSES.includes(status)) return { error: "Invalid status." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  revalidatePath("/account/orders");
  return { success: true };
}

// Admin-only: permanently remove an order (e.g. a test order or an abandoned
// Pending checkout). Gone from the admin tables and the customer's tracker.
export async function deleteOrder(id) {
  if (!(await isAdmin())) return { error: "Not authorized." };
  if (!id) return { error: "Missing order id." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  revalidatePath("/account/orders");
  return { success: true };
}

// Price the order on the server — never trust client-sent totals. Applies this
// customer's honoured offer prices, then shipping, then discount. Returns the DB
// record plus the pricing breakdown. Shared by placeOrder and Stripe checkout.
async function buildOrder(payload) {
  const { items, carrier, payment, name, email, address, city, postal, country, discountCode } = payload || {};

  if (!name || !email || !address) return { error: "Please fill in your name, email and address." };
  if (!items || items.length === 0) return { error: "Your cart is empty." };

  let honored = {};
  let accountEmail = null;
  try {
    const authClient = await createClient();
    const { data } = await authClient.auth.getUser();
    accountEmail = data?.user?.email || null;
    honored = await honoredOffersForEmail(accountEmail);
  } catch {
    honored = {};
  }

  const pricedItems = items.map((it) => {
    const offerPrice = honored[it.slug];
    return offerPrice != null ? { ...it, price: offerPrice, listPrice: it.price } : it;
  });
  const subtotal = pricedItems.reduce((sum, it) => sum + Number(it.price || 0), 0);
  const shipping = pricedItems.length >= 3 ? 0 : 6;

  let discountAmount = 0;
  let appliedCode = null;
  if (discountCode) {
    const res = await validateDiscount({
      code: discountCode,
      subtotal,
      itemCount: pricedItems.length,
      prices: pricedItems.map((it) => Number(it.price) || 0),
      email: accountEmail,
    });
    if (res.valid) {
      appliedCode = res.code;
      discountAmount = res.amount;
    }
  }
  const total = Math.max(0, subtotal + shipping - discountAmount);
  const id = "CRAY-" + Date.now().toString().slice(-6);

  const record = {
    id,
    customer_name: name,
    email,
    address,
    city,
    postal_code: postal,
    country,
    carrier,
    payment_method: payment,
    items: pricedItems,
    total,
    status: "New",
  };
  if (appliedCode) {
    record.subtotal = subtotal;
    record.discount_code = appliedCode;
    record.discount_amount = discountAmount;
  }

  return { record, pricedItems, subtotal, shipping, discountAmount, appliedCode, total, accountEmail };
}

function tableError(error) {
  return error.message.includes("Could not find the table")
    ? "Orders aren't set up yet — run docs/supabase-schema.sql in Supabase first."
    : error.message;
}

// Records an order for review. Used when Stripe isn't connected (no charge is
// taken), and when it is, the confirmation emails also flow from here's helpers.
export async function placeOrder(payload) {
  const built = await buildOrder(payload);
  if (built.error) return { error: built.error };
  const { record, appliedCode } = built;

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").insert(record);
  if (error) return { error: tableError(error) };

  if (appliedCode) await incrementDiscountUse(appliedCode);

  // Emails no-op silently until the email provider is connected.
  try {
    await sendOrderConfirmation(record);
    await sendAdminOrderNotification(record);
  } catch {}

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { success: true, orderId: record.id };
}

// Creates a Stripe Checkout session for the order. Returns { url } to redirect
// to. Returns { stripeDisabled: true } if Stripe isn't configured, so the client
// can fall back to placeOrder (record-only, no charge).
export async function createCheckoutSession(payload) {
  if (!stripeEnabled || !stripe) return { stripeDisabled: true };

  const built = await buildOrder(payload);
  if (built.error) return { error: built.error };
  const { record, pricedItems, total, appliedCode } = built;

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").insert({ ...record, status: "Pending" });
  if (error) return { error: tableError(error) };
  if (appliedCode) await incrementDiscountUse(appliedCode);

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://cray-stuff.vercel.app";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: record.email,
      // Single authoritative line — offers, discount and shipping are already
      // baked into the server-computed total, so Stripe charges exactly that.
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: { name: `Cray Stuff — ${pricedItems.length} piece${pricedItems.length > 1 ? "s" : ""}` },
            unit_amount: Math.round(Number(total) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { orderId: record.id },
      success_url: `${origin}/checkout?success=1&order=${record.id}`,
      cancel_url: `${origin}/checkout?canceled=1`,
    });

    revalidatePath("/admin/orders");
    return { url: session.url, orderId: record.id };
  } catch (e) {
    return { error: e?.message || "Could not start checkout." };
  }
}
