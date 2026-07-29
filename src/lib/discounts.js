import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// Maps a discount_codes row (snake_case) to the shape the UI expects.
function mapRow(row) {
  return {
    id: row.id,
    code: row.code,
    type: row.type, // 'percent' | 'fixed'
    value: Number(row.value),
    active: row.active,
    minItems: row.min_items ?? 1,
    maxUses: row.max_uses ?? null,
    usedCount: row.used_count ?? 0,
    expiresAt: row.expires_at ?? null,
    firstOrderOnly: row.first_order_only ?? false,
    oncePerCustomer: row.once_per_customer ?? false,
    createdAt: row.created_at,
  };
}

// Admin read of every code. Returns [] if the table doesn't exist yet, so the
// admin panel never breaks before docs/supabase-schema.sql has been run.
export async function getAllDiscounts() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("discount_codes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(mapRow);
  } catch {
    return [];
  }
}

// Pure calc: how much a code takes off. Percentages round to the nearest whole
// unit; nothing ever exceeds the subtotal. `prices` (the per-item prices) is
// only needed for the 'bogo' type, which discounts the cheapest item.
export function discountAmount({ type, value }, subtotal, prices = []) {
  if (!value || subtotal <= 0) return 0;
  if (type === "bogo") {
    if (!prices || prices.length < 2) return 0; // needs a 2nd item
    const cheapest = Math.min(...prices.map((p) => Number(p) || 0));
    return Math.min(Math.round((cheapest * value) / 100), subtotal);
  }
  if (type === "fixed") return Math.min(Math.round(value), subtotal);
  return Math.min(Math.round((subtotal * value) / 100), subtotal);
}
