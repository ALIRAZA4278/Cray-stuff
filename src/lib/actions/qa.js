"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin-auth";

// Customer asks a question on a product page.
export async function askQuestion(prevState, formData) {
  const slug = formData.get("slug")?.toString();
  const question = formData.get("question")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const name = formData.get("name")?.toString().trim() || null;

  if (!question) return { error: "Type your question first." };
  if (!email) return { error: "Enter your email so we can notify you of the answer." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("product_questions")
    .insert({ product_slug: slug, name, email, question });

  if (error) {
    return {
      error: error.message.includes("Could not find the table")
        ? "Q&A isn't set up yet — run docs/supabase-schema.sql."
        : error.message,
    };
  }

  revalidatePath(`/product/${slug}`);
  revalidatePath("/admin/messages");
  return { success: true };
}

// Admin answers a question. Answer becomes public on the product page.
export async function answerQuestion(id, slug, answer) {
  if (!(await isAdmin())) return { error: "Not authorized." };
  if (!answer?.trim()) return { error: "Write an answer." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("product_questions")
    .update({ answer: answer.trim(), answered_at: new Date().toISOString(), status: "answered" })
    .eq("id", id);

  if (error) return { error: error.message };

  if (slug) revalidatePath(`/product/${slug}`);
  revalidatePath("/admin/messages");
  return { success: true };
}
