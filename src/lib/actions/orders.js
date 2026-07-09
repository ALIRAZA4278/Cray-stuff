"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

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
  const { items, total, carrier, payment, name, email, address, city, postal, country } = payload || {};

  if (!name || !email || !address) {
    return { error: "Please fill in your name, email and address." };
  }
  if (!items || items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const id = "CRAY-" + Date.now().toString().slice(-6);

  const supabase = createAdminClient();
  const { error } = await supabase.from("orders").insert({
    id,
    customer_name: name,
    email,
    address,
    city,
    postal_code: postal,
    country,
    carrier,
    payment_method: payment,
    items,
    total,
    status: "New",
  });

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Orders aren't set up yet — run docs/supabase-schema.sql in Supabase first."
        : error.message,
    };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  return { success: true, orderId: id };
}
