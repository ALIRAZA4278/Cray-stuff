"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/lib/actions/contact";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, null);
  const t = getDict(useLocale());

  if (state?.success) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgContactSentEyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold uppercase tracking-tight">{t.pgContactSentTitle}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          {t.pgContactSentDesc}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={t.pgContactPhName} className={inputClass} autoComplete="name" />
        <input name="email" type="email" required placeholder={t.pgContactPhEmail} className={inputClass} autoComplete="email" />
      </div>
      <input name="subject" placeholder={t.pgContactPhSubject} className={inputClass} />
      <textarea name="message" required rows={6} placeholder={t.pgContactPhMessage} className={`${inputClass} resize-none`} />

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {pending ? t.pgContactSending : t.pgContactSend}
      </button>
    </form>
  );
}
