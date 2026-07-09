"use server";

// Product create/update/delete. Validates input and is structured to drop a
// Supabase insert/update/delete straight in once the products table exists
// (see docs/supabase-schema.sql). Until then it validates and confirms so the
// admin UI is fully exercisable.
export async function saveProduct(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const brand = formData.get("brand")?.toString().trim();
  const price = Number(formData.get("price"));

  if (!name || !brand) {
    return { error: "Name and brand are required." };
  }
  if (!price || price <= 0) {
    return { error: "Enter a valid price." };
  }

  // TODO: persist to Supabase `products` table here.
  return { success: true, name };
}
