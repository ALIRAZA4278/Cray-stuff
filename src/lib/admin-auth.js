import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export const ADMIN_COOKIE = "cray_admin";

// The admin session token is derived from the credentials, so changing
// ADMIN_EMAIL / ADMIN_PASSWORD in .env.local instantly invalidates old sessions.
export function adminToken() {
  const secret = `${process.env.ADMIN_EMAIL || ""}:${process.env.ADMIN_PASSWORD || ""}`;
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function verifyAdminCredentials(email, password) {
  const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || "";
  if (!envEmail || !envPassword) return false;
  return (email || "").trim().toLowerCase() === envEmail && password === envPassword;
}

// True if the current request carries a valid admin session cookie.
export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}

// Gate for the admin dashboard. Redirects to the admin login if not signed in.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
