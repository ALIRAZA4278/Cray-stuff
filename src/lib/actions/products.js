"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
}

// Create or update a product in Supabase. Used by ProductForm via useActionState.
export async function saveProduct(prevState, formData) {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const id = formData.get("id")?.toString() || null;
  const name = formData.get("name")?.toString().trim();
  const brand = formData.get("brand")?.toString().trim();
  const price = Number(formData.get("price"));

  if (!name || !brand) return { error: "Name and brand are required." };
  if (!price || price <= 0) return { error: "Enter a valid price." };

  const row = {
    name,
    brand,
    price,
    min_offer: formData.get("minOffer") ? Number(formData.get("minOffer")) : null,
    size: formData.get("size")?.toString().trim() || null,
    condition: formData.get("condition")?.toString() || null,
    category: formData.get("category")?.toString() || "unisex",
    measurements: formData.get("measurements")?.toString().trim() || null,
    description: formData.get("description")?.toString().trim() || null,
    flaws: formData.get("flaws")?.toString().trim() || null,
    tags: formData.getAll("tags").map(String),
    sold: formData.get("sold") === "on",
  };

  // Material & country were removed from the form (they live in the description
  // now). Only touch these columns if a form actually submits them, so editing a
  // product that still has them doesn't wipe the values.
  if (formData.has("material")) row.material = formData.get("material")?.toString().trim() || null;
  if (formData.has("country")) row.country = formData.get("country")?.toString().trim() || null;

  // Image URLs — one per line or comma-separated. Only set when provided so
  // add-product keeps working even before the `images` column is added.
  // Split on newlines only — Cloudinary transform URLs contain commas
  // (e.g. f_auto,q_auto,c_limit,w_1600), so splitting on commas would shatter them.
  const images = (formData.get("images") || "")
    .toString()
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (images.length) row.images = images;

  const supabase = createAdminClient();

  const persist = (data) =>
    id
      ? supabase.from("products").update(data).eq("id", id)
      : supabase.from("products").insert({ ...data, slug: slugify(name) });

  let { error } = await persist(row);

  // Graceful fallback: if the `currency` column hasn't been added yet, save
  // without it so adding products keeps working before the migration is run.
  if (error && /currency/i.test(error.message) && "currency" in row) {
    const { currency, ...withoutCurrency } = row;
    void currency;
    ({ error } = await persist(withoutCurrency));
  }

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Run docs/supabase-schema.sql in Supabase first to create the products table."
        : error.message,
    };
  }

  revalidateCatalog();
  return { success: true, name };
}

// Delete a product, then return to the product list.
export async function deleteProduct(id) {
  if (!(await isAdmin())) redirect("/");
  const supabase = createAdminClient();
  await supabase.from("products").delete().eq("id", id);
  revalidateCatalog();
  redirect("/admin/products");
}
