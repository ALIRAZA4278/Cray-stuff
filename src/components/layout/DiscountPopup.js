"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "cray-discount-popup-seen";

export default function DiscountPopup() {
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
    setSubmitted(true);
    sessionStorage.setItem(SEEN_KEY, "1");
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6"
    >
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8 text-center">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Cray Stuff</p>
        <h2 className="mt-3 text-xl font-semibold uppercase tracking-tight">Get 10% off</h2>
        <p className="mt-2 text-sm text-muted">
          Sign up for early access to new drops and 10% off your first order.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm text-accent">You&apos;re in — check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Get my code
            </button>
          </form>
        )}
        <button
          type="button"
          onClick={close}
          className="mt-4 text-xs text-muted underline-offset-2 hover:underline"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
