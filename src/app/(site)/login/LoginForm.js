"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import { AuthField, SubmitButton, AuthDivider } from "@/components/auth/AuthField";
import SocialAuth from "@/components/auth/SocialAuth";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function LoginForm({ initialError }) {
  const [state, formAction, pending] = useActionState(login, null);
  const error = state?.error || initialError;
  const t = getDict(useLocale());

  return (
    <div className="space-y-5">
      <SocialAuth />
      <AuthDivider />

      <form action={formAction} className="space-y-4">
        <AuthField label={t.pgLoginEmail} name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        <AuthField
          label={t.pgLoginPassword}
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <SubmitButton pending={pending}>{t.pgLoginSubmit}</SubmitButton>
      </form>
    </div>
  );
}
