"use client";

import { useActionState, useEffect } from "react";
import { useAnimate } from "motion/react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function NewsletterForm() {
  const t = getDict(useLocale());
  const [state, formAction, pending] = useActionState(subscribeNewsletter, null);
  const [scope, animate] = useAnimate();

  // useAnimate: celebrate a successful sign-up, shake on error.
  useEffect(() => {
    if (state?.success) {
      animate("button", { scale: [1, 1.14, 1] }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
      animate(".newsletter-msg", { opacity: [0, 1], y: [10, 0] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
    } else if (state?.error) {
      animate("input", { x: [0, -8, 8, -6, 6, 0] }, { duration: 0.4 });
    }
  }, [state, animate]);

  return (
    <div ref={scope} className="w-full max-w-md">
      <form action={formAction} className="flex w-full gap-2">
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={t.nlEmailPlaceholder}
          className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending || state?.success}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state?.success ? t.nlSubscribed : pending ? "…" : t.nlSubscribe}
        </button>
      </form>
      {state?.error && <p className="newsletter-msg mt-2 text-xs text-red-400">{state.error}</p>}
      {state?.success && <p className="newsletter-msg mt-2 text-xs text-accent">{t.nlSuccess}</p>}
    </div>
  );
}
