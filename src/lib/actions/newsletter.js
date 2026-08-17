"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewsletterWelcome } from "@/lib/email";

export async function subscribeNewsletter(prevState, formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  if (!email || !email.includes("@")) return { error: "Enter a valid email." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") return { success: true }; // already subscribed — fine
    if (error.message.includes("Could not find the table")) {
      return { error: "Newsletter isn't set up yet — run docs/supabase-schema.sql." };
    }
    return { error: "Something went wrong. Please try again." };
  }

  // Welcome + 10% code — no-ops silently until the email provider is connected.
  try {
    await sendNewsletterWelcome(email);
  } catch {}

  return { success: true };
}
