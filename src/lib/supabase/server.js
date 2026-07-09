import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Supabase client for use on the server (Server Components, Route Handlers,
// Server Actions). In Next 16 `cookies()` is async, so this must be awaited.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component, where writing cookies isn't
            // allowed. Safe to ignore if you refresh sessions in middleware/proxy.
          }
        },
      },
    }
  );
}
