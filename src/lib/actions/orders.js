"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin-auth";
import { incrementDiscountUse, validateDiscount } from "@/lib/actions/discounts";
import { honoredOffersForEmail } from "@/lib/offers";

const ORDER_STATUSES = ["New", "Paid", "Shipped", "Delivered", "Cancelled"];

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

// Places an order at checkout. No payment is taken yet — that's Stripe's job
// later. This records the order so it shows up in the admin Orders inbox.
export async function placeOrder(payload) {
  const { items, carrier, payment, name, email, address, city, postal, country } = payload || {};
  const { discountCode } = payload || {};

  if (!name || !email || !address) {
    return { error: "Please fill in your name, email and address." };
  }
  if (!items || items.length === 0) {
    return { error: "Your cart is empty." };
  }

  // Price the order on the server — never trust client-sent totals. Apply this
  // customer's honoured (accepted) offer prices, then shipping, then discount.
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

  // Only reference the discount columns when a code was actually used, so
  // normal orders keep working even before the schema migration is re-run.
  if (appliedCode) {
    record.subtotal = subtotal;
    record.discount_code = appliedCode;
    record.discount_amount = discountAmount;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").insert(record);

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Orders aren't set up yet — run docs/supabase-schema.sql in Supabase first."
        : error.message,
    };
  }

  if (appliedCode) await incrementDiscountUse(appliedCode);

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { success: true, orderId: id };
}
