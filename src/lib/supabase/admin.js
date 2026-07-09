import "server-only";
import { createClient } from "@supabase/supabase-js";

// Admin client with the secret key. Bypasses Row Level Security — use ONLY in
// trusted server code (Route Handlers, Server Actions, cron jobs). The
// "server-only" import makes the build fail if this is ever imported into a
// Client Component, so the secret key can never leak to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
