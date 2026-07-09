import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getQuestionsForProduct(slug) {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("product_questions")
      .select("*")
      .eq("product_slug", slug)
      .order("created_at", { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export async function getAllQuestions() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("product_questions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}
