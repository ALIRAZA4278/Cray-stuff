"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import { AuthField, SubmitButton, AuthDivider } from "@/components/auth/AuthField";
import SocialAuth from "@/components/auth/SocialAuth";

export default function LoginForm({ initialError }) {
  const [state, formAction, pending] = useActionState(login, null);
  const error = state?.error || initialError;

  return (
    <div className="space-y-5">
      <SocialAuth />
      <AuthDivider />

      <form action={formAction} className="space-y-4">
        <AuthField label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton pending={pending}>Sign in</SubmitButton>
      </form>
    </div>
  );
}
