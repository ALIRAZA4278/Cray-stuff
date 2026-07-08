"use client";

import { useState } from "react";
import Link from "next/link";

export default function MakeOfferDialog({ price, minOffer }) {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(offer);
    if (!amount) return;
    setResult(amount >= minOffer ? "accepted" : "countered");
  }

  function close() {
    setOpen(false);
    setResult(null);
    setOffer("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        Make an offer
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6"
        >
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8">
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

            {result === "accepted" && (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Offer accepted</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">
                  You&apos;re in at &euro;{offer}
                </h3>
                <p className="mt-2 text-sm text-muted">Your order can be shipped today.</p>
                <Link
                  href="/checkout"
                  className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Continue to checkout
                </Link>
              </div>
            )}

            {result === "countered" && (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Counteroffer</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">We can do &euro;{minOffer}</h3>
                <p className="mt-2 text-sm text-muted">
                  &euro;{offer} is below what we can accept on this piece &mdash; here&apos;s our best price instead.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Accept &euro;{minOffer}
                  </Link>
                  <button type="button" onClick={close} className="text-sm text-muted hover:text-foreground">
                    No thanks
                  </button>
                </div>
              </div>
            )}

            {!result && (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Make an offer</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">Name your price</h3>
                <p className="mt-2 text-sm text-muted">
                  Listed at &euro;{price}. Meet our price and it&apos;s an instant match &mdash; otherwise
                  we&apos;ll counter.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="number"
                    min="1"
                    required
                    value={offer}
                    onChange={(event) => setOffer(event.target.value)}
                    placeholder={`e.g. ${Math.round(price * 0.85)}`}
                    className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                  >
                    Submit offer
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
