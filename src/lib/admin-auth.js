import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Gate for the /admin section. Requires a signed-in user whose email is in the
// ADMIN_EMAILS allow-list. Returns the user, or redirects away. There is no
// role system yet — this allow-list is the intentional interim guard.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?error=Please sign in to continue.");

  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!allowed.includes(user.email?.toLowerCase())) {
    redirect("/");
  }

  return user;
}
