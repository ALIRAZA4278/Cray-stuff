"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";
import { discountAmount } from "@/lib/discounts";

// Create or update a discount code. Used by DiscountForm via useActionState.
export async function saveDiscount(prevState, formData) {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const code = formData.get("code")?.toString().trim().toUpperCase();
  const type = formData.get("type")?.toString() === "fixed" ? "fixed" : "percent";
  const value = Number(formData.get("value"));

  if (!code) return { error: "Enter a code." };
  if (!/^[A-Z0-9]+$/.test(code)) return { error: "Use letters and numbers only, no spaces." };
  if (!value || value <= 0) return { error: "Enter a value above 0." };
  if (type === "percent" && value > 100) return { error: "A percentage can't be over 100." };

  const row = {
    code,
    type,
    value,
    active: formData.get("active") === "on",
    min_items: formData.get("minItems") ? Number(formData.get("minItems")) : 1,
    max_uses: formData.get("maxUses") ? Number(formData.get("maxUses")) : null,
    expires_at: formData.get("expiresAt") ? new Date(formData.get("expiresAt")).toISOString() : null,
  };

  const id = formData.get("id")?.toString() || null;
  const supabase = createAdminClient();
  let error;

  if (id) {
    ({ error } = await supabase.from("discount_codes").update(row).eq("id", id));
  } else {
    ({ error } = await supabase.from("discount_codes").insert(row));
  }

  if (error) {
    if (error.message.includes("Could not find the table")) {
      return { error: "Run docs/supabase-schema.sql in Supabase first to create the discount_codes table." };
    }
    if (error.code === "23505" || error.message.includes("duplicate")) {
      return { error: `Code "${code}" already exists.` };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/discounts");
  return { success: true, code };
}

// Delete a code, then return to the list.
export async function deleteDiscount(id) {
  if (!(await isAdmin())) redirect("/");
  const supabase = createAdminClient();
  await supabase.from("discount_codes").delete().eq("id", id);
  revalidatePath("/admin/discounts");
  redirect("/admin/discounts");
}

// Checkout: validate a code against the current cart. Returns only safe fields
// (never the whole row), so codes and their rules stay server-side.
export async function validateDiscount({ code, subtotal, itemCount }) {
  const clean = (code || "").trim().toUpperCase();
  if (!clean) return { valid: false, message: "Enter a code." };

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("discount_codes").select("*").eq("code", clean).maybeSingle();

    if (error || !data) return { valid: false, message: "That code isn't valid." };
    if (!data.active) return { valid: false, message: "This code is no longer active." };
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { valid: false, message: "This code has expired." };
    }
    if (data.max_uses != null && data.used_count >= data.max_uses) {
      return { valid: false, message: "This code has reached its usage limit." };
    }
    if ((itemCount || 0) < (data.min_items || 1)) {
      return { valid: false, message: `Add ${data.min_items} or more items to use this code.` };
    }

    const amount = discountAmount({ type: data.type, value: Number(data.value) }, Number(subtotal) || 0);
    const label = data.type === "fixed" ? `$${Number(data.value)} off` : `${Number(data.value)}% off`;
    return { valid: true, code: clean, amount, label };
  } catch {
    return { valid: false, message: "Couldn't check that code right now — try again." };
  }
}

// Best-effort usage increment, called once an order using the code is placed.
export async function incrementDiscountUse(code) {
  const clean = (code || "").trim().toUpperCase();
  if (!clean) return;
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("discount_codes").select("id,used_count").eq("code", clean).maybeSingle();
    if (data) {
      await supabase.from("discount_codes").update({ used_count: (data.used_count || 0) + 1 }).eq("id", data.id);
    }
  } catch {
    // Non-fatal — the order still goes through even if the counter misses.
  }
}
