"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

// Customer submits an offer. Auto-accept at/above the hidden min price,
// auto-counter below it, or leave Pending if the piece has no min set.
export async function submitOffer(payload) {
  const { slug, productName, listPrice, minOffer, offer, name, email } = payload || {};
  const amount = Number(offer);

  if (!amount || amount <= 0) return { error: "Enter a valid offer amount." };
  if (!email) return { error: "Enter your email so we can reach you." };

  let status = "Pending";
  let counter = null;
  let outcome = "pending";

  if (minOffer != null) {
    if (amount >= minOffer) {
      status = "Auto-accepted";
      outcome = "accepted";
    } else {
      status = "Countered";
      counter = minOffer;
      outcome = "countered";
    }
  }

  const id = "OF-" + Date.now().toString().slice(-6);
  const supabase = createAdminClient();
  const { error } = await supabase.from("offers").insert({
    id,
    product_slug: slug,
    product_name: productName,
    customer_name: name || null,
    email,
    offer_price: amount,
    list_price: listPrice,
    min_offer: minOffer,
    counter_price: counter,
    status,
  });

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Offers aren't set up yet — run docs/supabase-schema.sql."
        : error.message,
    };
  }

  revalidatePath("/admin/offers");
  revalidatePath("/admin");
  return { success: true, outcome, counter };
}

// Admin manual decision for offers without a min price (or as override).
export async function decideOffer(id, decision) {
  if (!(await isAdmin())) return { error: "Not authorized." };
  const status = decision === "accept" ? "Accepted" : "Declined";
  const supabase = createAdminClient();
  const { error } = await supabase.from("offers").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/offers");
  revalidatePath("/admin");
  return { success: true };
}
