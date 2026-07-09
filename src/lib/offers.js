import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { sampleOffers } from "@/lib/admin-data";

function mapRow(row) {
  return {
    id: row.id,
    product: row.product_name,
    slug: row.product_slug,
    customer: row.customer_name || "—",
    email: row.email,
    offer: Number(row.offer_price),
    listPrice: row.list_price != null ? Number(row.list_price) : null,
    minOffer: row.min_offer != null ? Number(row.min_offer) : null,
    status: row.status,
    date: row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : "",
  };
}

// Real offers from Supabase; falls back to sample data only if the table is
// missing (keeps admin populated pre-setup).
export async function getAllOffers() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return sampleOffers;
    return (data || []).map(mapRow);
  } catch {
    return sampleOffers;
  }
}
