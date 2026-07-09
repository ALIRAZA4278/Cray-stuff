import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refreshes the Supabase auth session on every request and keeps the auth
// cookies in sync between the browser and the server. Runs from middleware.
// Do not add logic between creating the client and calling getUser() — it can
// cause hard-to-debug session desync (per Supabase's SSR guidance).
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}
