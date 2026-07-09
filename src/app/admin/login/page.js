import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import AdminLoginForm from "./AdminLoginForm";

export const metadata = { title: "Admin sign in — CRAY STUFF" };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-lg font-semibold uppercase tracking-tight">
            Cray<span className="text-accent"> Stuff</span>
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">Admin panel</p>
        </div>

        <h1 className="mt-10 text-center text-2xl font-semibold uppercase tracking-tight">Sign in</h1>
        <p className="mt-2 text-center text-sm text-muted">Authorised staff only.</p>

        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
