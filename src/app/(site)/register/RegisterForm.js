"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { AuthField, SubmitButton, AuthDivider } from "@/components/auth/AuthField";
import SocialAuth from "@/components/auth/SocialAuth";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(signup, null);
  const t = getDict(useLocale());

  return (
    <div className="space-y-5">
      <SocialAuth />
      <AuthDivider />

      <form action={formAction} className="space-y-4">
        <AuthField label={t.pgRegisterName} name="name" autoComplete="name" required={false} placeholder={t.pgRegisterPhName} />
        <AuthField label={t.pgRegisterEmail} name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        <AuthField
          label={t.pgRegisterPassword}
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder={t.pgRegisterPhPassword}
        />

        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state?.message && <p className="text-sm text-accent">{state.message}</p>}

        <SubmitButton pending={pending}>{t.pgRegisterSubmit}</SubmitButton>
      </form>

      <p className="text-xs text-muted">
        {t.pgRegisterTerms}
      </p>
    </div>
  );
}
