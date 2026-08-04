"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { honoredOffersForEmail } from "@/lib/offers";
import { isAdmin } from "@/lib/admin-auth";

// The email an accepted price is tied to = the signed-in account, never a typed
// field. Prevents anyone from buying at someone else's negotiated price.
async function currentEmail() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return data?.user?.email || null;
  } catch {
    return null;
  }
}

// Customer submits an offer. Every offer lands as Pending for the seller to
// review by hand — no auto-accept or auto-counter. The min price is still stored
// as a private reference for the admin. On accept, the customer's offered price
// is honoured at checkout (their personal discount).
export async function submitOffer(payload) {
  const { slug, productName, listPrice, minOffer, offer } = payload || {};
  const amount = Number(offer);

  if (!amount || amount <= 0) return { error: "Enter a valid offer amount." };

  const email = await currentEmail();
  if (!email) return { error: "Please sign in to make an offer." };

  const id = "OF-" + Date.now().toString().slice(-6);
  const supabase = createAdminClient();
  const { error } = await supabase.from("offers").insert({
    id,
    product_slug: slug,
    product_name: productName,
    email,
    offer_price: amount,
    list_price: listPrice,
    min_offer: minOffer,
    counter_price: null,
    status: "Pending",
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
  return { success: true, outcome: "pending", id };
}

// Customer accepts a counteroffer — honours it at the counter price for them.
export async function acceptCounter(id) {
  const email = await currentEmail();
  if (!email) return { error: "Please sign in first." };
  const supabase = createAdminClient();
  // Only the offer's owner can accept it.
  const { data } = await supabase.from("offers").select("email,counter_price").eq("id", id).maybeSingle();
  if (!data || data.email !== email) return { error: "Offer not found." };
  const { error } = await supabase.from("offers").update({ status: "Accepted" }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/offers");
  return { success: true, price: data.counter_price != null ? Number(data.counter_price) : null };
}

// The signed-in customer's honoured offer prices, as { slug: price }. Used at
// cart/checkout to show and charge the negotiated price for that customer only.
export async function getMyAcceptedOffers() {
  const email = await currentEmail();
  return honoredOffersForEmail(email);
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
