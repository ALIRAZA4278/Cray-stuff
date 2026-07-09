"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminToken, verifyAdminCredentials } from "@/lib/admin-auth";

// Admin login — checks the credentials from .env.local and sets the session
// cookie. Separate from customer (Supabase) auth.
export async function adminLogin(prevState, formData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Incorrect email or password." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/admin");
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
