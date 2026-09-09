"use client";

import Link from "next/link";
import { useFireList } from "@/lib/FireListContext";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// Shown once, the moment someone Fires their first piece. Same shape as the
// newsletter DiscountPopup so the two read as one system — but triggered by the
// action rather than a timer, which is why it lands while the flame is still
// fresh in mind.
export default function FireListIntro() {
  const { showIntro, dismissIntro } = useFireList();
  const t = getDict(useLocale());

  if (!showIntro) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fire-intro-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-6"
    >
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8 text-center">
        <button
          type="button"
          onClick={dismissIntro}
          aria-label={t.dpClose}
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-accent shadow-[0_0_22px_var(--accent-glow)] ring-2 ring-accent">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="h-7 w-7">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </div>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">{t.fiEyebrow}</p>
        <h2 id="fire-intro-title" className="mt-2 text-xl font-semibold uppercase tracking-tight">
          {t.fiTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.fiBody}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted">{t.fiWarning}</p>

        <Link
          href="/fire-list"
          onClick={dismissIntro}
          className="mt-6 block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          {t.fiViewList}
        </Link>
        <button
          type="button"
          onClick={dismissIntro}
          className="mt-4 text-xs text-muted underline-offset-2 hover:underline"
        >
          {t.fiKeepBrowsing}
        </button>
      </div>
    </div>
  );
}
