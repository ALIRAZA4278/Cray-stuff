"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

const MISSING_TABLE =
  "Run docs/supabase-schema.sql in Supabase first to create the customer_reviews table.";

// Revalidate everywhere a review or the review count is rendered.
function revalidateReviewSurfaces() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
}

// Create or update one review. Used by ReviewForm via useActionState.
export async function saveReview(prevState, formData) {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const name = formData.get("name")?.toString().trim();
  const text = formData.get("text")?.toString().trim();
  const rating = Number(formData.get("rating"));
  const source = formData.get("source")?.toString().trim() || "Vinted";
  const sortOrder = Number(formData.get("sortOrder")) || 0;

  if (!name) return { error: "Enter the customer's name or handle." };
  if (!text) return { error: "Enter the review text." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { error: "Rating must be between 1 and 5." };

  const row = {
    name,
    text,
    rating,
    source,
    sort_order: sortOrder,
    published: formData.get("published") === "on",
  };

  const id = formData.get("id")?.toString() || null;
  const supabase = createAdminClient();
  const { error } = id
    ? await supabase.from("customer_reviews").update(row).eq("id", id)
    : await supabase.from("customer_reviews").insert(row);

  if (error) {
    return { error: error.message.includes("Could not find the table") ? MISSING_TABLE : error.message };
  }

  revalidateReviewSurfaces();
  return { success: true, name };
}

// Delete a review, then return to the list.
export async function deleteReview(id) {
  if (!(await isAdmin())) redirect("/");
  const supabase = createAdminClient();
  await supabase.from("customer_reviews").delete().eq("id", id);
  revalidateReviewSurfaces();
  redirect("/admin/reviews");
}

// Publish / unpublish without opening the edit form — the common case is
// temporarily hiding one review, not rewriting it.
export async function toggleReviewPublished(id, published) {
  if (!(await isAdmin())) return { error: "Not authorized." };
  const supabase = createAdminClient();
  const { error } = await supabase.from("customer_reviews").update({ published }).eq("id", id);
  if (error) {
    return { error: error.message.includes("Could not find the table") ? MISSING_TABLE : error.message };
  }
  revalidateReviewSurfaces();
  return { success: true };
}
