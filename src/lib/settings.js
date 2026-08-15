import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// Sensible fallback so the storefront never breaks before the site_settings
// table exists or a value has been set.
export const DEFAULT_REVIEW_COUNT = 650;

// The public review count shown across the site (home stat, trust bar, reviews
// page, philosophy panel). Admin-editable; falls back to the default.
export async function getReviewCount() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "review_count")
      .maybeSingle();
    if (error || !data) return DEFAULT_REVIEW_COUNT;
    const n = Number(data.value);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_REVIEW_COUNT;
  } catch {
    return DEFAULT_REVIEW_COUNT;
  }
}
