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

// Pure calc: how much a code takes off a given subtotal. Percentages round to
// the nearest whole unit; fixed amounts never exceed the subtotal.
export function discountAmount({ type, value }, subtotal) {
  if (!value || subtotal <= 0) return 0;
  if (type === "fixed") return Math.min(Math.round(value), subtotal);
  return Math.min(Math.round((subtotal * value) / 100), subtotal);
}
