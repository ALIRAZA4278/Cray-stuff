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

// A customer's honoured (accepted) offer prices, keyed by product slug. Used to
// charge the negotiated price for that customer only. Server-side source of
// truth — the client price is never trusted.
export async function honoredOffersForEmail(email) {
  if (!email) return {};
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("offers")
      .select("product_slug,offer_price,counter_price,status")
      .eq("email", email)
      .in("status", ["Auto-accepted", "Accepted"]);
    const map = {};
    for (const o of data || []) {
      const price = o.counter_price != null ? Number(o.counter_price) : Number(o.offer_price);
      if (map[o.product_slug] == null || price < map[o.product_slug]) map[o.product_slug] = price;
    }
    return map;
  } catch {
    return {};
  }
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
