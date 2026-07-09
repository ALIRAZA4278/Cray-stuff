"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function getOrigin() {
  const h = await headers();
  return h.get("origin") ?? `http://${h.get("host")}`;
}

// Email + password sign-in. Used with useActionState — returns { error } on
// failure, otherwise redirects to the account dashboard.
export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/account");
}

// Email + password sign-up. With email confirmation enabled (Supabase default)
// no session is returned yet, so we ask the user to check their inbox.
export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }
  if (String(password).length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const origin = await getOrigin();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: name || null },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return { error: error.message };

  // Email confirmation on: user exists but no active session yet.
  if (data?.user && !data.session) {
    return { message: "Almost there — check your email to confirm your account." };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

// OAuth sign-in. Bind the provider in the client: signInWithProvider.bind(null, "google").
export async function signInWithProvider(provider) {
  const supabase = await createClient();
  const origin = await getOrigin();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error) return { error: error.message };
  if (data?.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
