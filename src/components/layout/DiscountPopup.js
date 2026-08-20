"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

const SEEN_KEY = "cray-discount-popup-seen";

export default function DiscountPopup() {
  const t = getDict(useLocale());
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setOpen(false);
    sessionStorage.setItem(SEEN_KEY, "1");
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Save the subscriber and fire the welcome email (no-ops without a provider).
    // Fire-and-forget so the code shows instantly regardless.
    const data = new FormData();
    data.append("email", email);
    subscribeNewsletter(null, data).catch(() => {});
    setSubmitted(true);
    sessionStorage.setItem(SEEN_KEY, "1");
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-6"
    >
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8 text-center">
        <button
          type="button"
          onClick={close}
          aria-label={t.dpClose}
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.dpBrand}</p>
        <h2 className="mt-3 text-xl font-semibold uppercase tracking-tight">{t.dpTitle}</h2>
        <p className="mt-2 text-sm text-muted">
          {t.dpDesc}
        </p>
        {submitted ? (
          <div className="mt-6">
            <p className="text-sm text-muted">{t.dpCodeIntro}</p>
            <p className="mt-2 rounded-md border border-accent/40 bg-accent/5 px-4 py-2 font-mono text-lg font-semibold tracking-widest text-accent">
              WELCOME10
            </p>
            <p className="mt-2 text-xs text-muted">{t.dpEnterCheckout}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.dpEmailPlaceholder}
              className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.dpGetCode}
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={close}
          className="mt-4 text-xs text-muted underline-offset-2 hover:underline"
        >
          {t.dpNoThanks}
        </button>
      </div>
    </div>
  );
}
