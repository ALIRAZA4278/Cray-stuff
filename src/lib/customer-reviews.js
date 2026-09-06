import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { reviews as seedReviews } from "@/lib/reviews";

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    rating: row.rating ?? 5,
    text: row.text,
    source: row.source || "Vinted",
    sortOrder: row.sort_order ?? 0,
    published: row.published !== false,
  };
}

// Published reviews for the storefront.
//
// Falls back to the hand-transcribed seed list in src/lib/reviews.js whenever
// the table is missing or still empty, so the reviews section never renders
// blank between the migration running and Wiktor adding the first one.
export async function getPublishedReviews() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("customer_reviews")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return seedReviews;
    return data.map(mapRow);
  } catch {
    return seedReviews;
  }
}

// Every review, published or not — the admin list view.
export async function getAllReviews() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("customer_reviews")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(mapRow);
  } catch {
    return [];
  }
}

export async function getReviewById(id) {
  const all = await getAllReviews();
  return all.find((r) => String(r.id) === String(id)) || null;
}
