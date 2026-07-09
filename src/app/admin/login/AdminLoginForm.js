"use client";

import { useActionState } from "react";
import { adminLogin } from "@/lib/actions/admin-auth";
import PasswordInput from "@/components/auth/PasswordInput";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, null);

  return (
    <form action={formAction} className="space-y-4">
      <input name="email" type="email" required placeholder="Email" className={inputClass} autoComplete="username" />
      <PasswordInput name="password" required placeholder="Password" className={inputClass} autoComplete="current-password" />
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
