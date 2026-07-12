"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const AuthContext = createContext({ user: null, loading: true });

// Tracks the logged-in customer on the client so action buttons can gate
// behind login. Reads the session on mount and stays in sync with auth changes.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    // getSession reads the cookie locally, so the user resolves almost
    // instantly — no network round-trip to leave action buttons thinking
    // you're logged out for the first second after a page load.
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// Convenience hook for gating an action behind login. Returns a wrapper that
// runs the action if signed in, otherwise sends the user to /login.
export function useRequireLogin() {
  const { user } = useAuth();
  const router = useRouter();
  return async function run(action) {
    let signedIn = user;
    // If context hasn't resolved yet, don't assume logged out — check the
    // session directly so a quick click doesn't bounce a logged-in user.
    if (!signedIn) {
      const { data } = await createClient().auth.getSession();
      signedIn = data.session?.user ?? null;
    }
    if (!signedIn) {
      router.push("/login");
      return false;
    }
    action?.();
    return true;
  };
}
