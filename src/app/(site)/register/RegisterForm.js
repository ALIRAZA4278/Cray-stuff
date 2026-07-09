"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { AuthField, SubmitButton, AuthDivider } from "@/components/auth/AuthField";
import SocialAuth from "@/components/auth/SocialAuth";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(signup, null);

  return (
    <div className="space-y-5">
      <SocialAuth />
      <AuthDivider />

      <form action={formAction} className="space-y-4">
        <AuthField label="Name" name="name" autoComplete="name" required={false} placeholder="Optional" />
        <AuthField label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />

        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state?.message && <p className="text-sm text-accent">{state.message}</p>}

        <SubmitButton pending={pending}>Create account</SubmitButton>
      </form>

      <p className="text-xs text-muted">
        By creating an account you agree to our terms and privacy policy.
      </p>
    </div>
  );
}
