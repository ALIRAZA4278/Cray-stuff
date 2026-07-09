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
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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
  return function run(action) {
    if (!user) {
      router.push("/login");
      return false;
    }
    action?.();
    return true;
  };
}
