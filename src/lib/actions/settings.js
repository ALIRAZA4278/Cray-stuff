"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

// Admin updates the public review count. Stored in site_settings and reflected
// everywhere the count is shown.
export async function saveReviewCount(prevState, formData) {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const count = parseInt(formData.get("reviewCount"), 10);
  if (!Number.isFinite(count) || count < 0) return { error: "Enter a valid number." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "review_count", value: String(count), updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Run the site_settings migration in docs/supabase-schema.sql first."
        : error.message,
    };
  }

  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin");
  return { success: true, count };
}
