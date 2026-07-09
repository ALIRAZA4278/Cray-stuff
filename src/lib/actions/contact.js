"use server";

import { createAdminClient } from "@/lib/supabase/admin";

// Handles the /contact form. Inserts the message with the service-role client
// (server-side, trusted) so it lands in the admin Messages inbox.
export async function sendContactMessage(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email and message." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });

  if (error) {
    // Most likely the table hasn't been created yet — see docs/supabase-schema.sql.
    return { error: "Something went wrong sending your message. Please try again shortly." };
  }

  return { success: true };
}
