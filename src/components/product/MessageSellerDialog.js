"use client";

import { useActionState, useState } from "react";
import { askQuestion } from "@/lib/actions/qa";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

const inputClass =
  "w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

// Lets a customer send a question about a specific piece. Reuses the product-Q&A
// action, so it lands in the admin inbox tagged with this product.
export default function MessageSellerDialog({ product }) {
  const t = getDict(useLocale());
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(askQuestion, null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        {t.prMessageSeller}
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-6">
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.prClose}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {state?.success ? (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.prMessageSentTitle}</p>
                <p className="mt-3 text-sm text-muted">{t.prQuestionSent}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 text-sm text-muted hover:text-foreground"
                >
                  {t.prClose}
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.prMessageSeller}</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">{t.prMessageTitle}</h3>
                <p className="mt-2 text-sm text-muted">{t.prMessageDesc}</p>
                <form action={formAction} className="mt-6 flex flex-col gap-3">
                  <input type="hidden" name="slug" value={product.slug} />
                  <input name="name" autoComplete="name" placeholder={t.prMessageNamePlaceholder} className={inputClass} />
                  <input type="email" name="email" autoComplete="email" required placeholder={t.prEmailPlaceholder} className={inputClass} />
                  <textarea
                    name="question"
                    required
                    rows={3}
                    placeholder={t.prQuestionPlaceholder}
                    className="w-full rounded-2xl border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
                  />
                  {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {pending ? t.prSending : t.prMessageSend}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
