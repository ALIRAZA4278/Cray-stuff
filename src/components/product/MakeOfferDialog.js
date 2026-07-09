"use client";

import { useState } from "react";
import Link from "next/link";
import { submitOffer } from "@/lib/actions/offers";
import { useRequireLogin } from "@/lib/AuthContext";

const inputClass =
  "w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export default function MakeOfferDialog({ product }) {
  const { slug, name: productName, price, minOffer } = product;
  const run = useRequireLogin();
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { outcome, counter }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const res = await submitOffer({
      slug,
      productName,
      listPrice: price,
      minOffer,
      offer: Number(offer),
      email,
    });
    setPending(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setResult(res);
  }

  function close() {
    setOpen(false);
    setResult(null);
    setOffer("");
    setEmail("");
    setError(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => run(() => setOpen(true))}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        Make an offer
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-6">
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

            {result?.outcome === "accepted" && (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Offer accepted</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">You&apos;re in at &euro;{offer}</h3>
                <p className="mt-2 text-sm text-muted">Your order can be shipped today.</p>
                <Link href="/checkout" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
                  Continue to checkout
                </Link>
              </div>
            )}

            {result?.outcome === "countered" && (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Counteroffer</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">We can do &euro;{result.counter}</h3>
                <p className="mt-2 text-sm text-muted">
                  &euro;{offer} is below what we can accept on this piece &mdash; here&apos;s our best price instead.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/checkout" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
                    Accept &euro;{result.counter}
                  </Link>
                  <button type="button" onClick={close} className="text-sm text-muted hover:text-foreground">
                    No thanks
                  </button>
                </div>
              </div>
            )}

            {result?.outcome === "pending" && (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Offer sent</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">We&apos;ll be in touch</h3>
                <p className="mt-2 text-sm text-muted">
                  Thanks — we&apos;ve got your &euro;{offer} offer and will reply by email shortly.
                </p>
                <button type="button" onClick={close} className="mt-6 text-sm text-muted hover:text-foreground">
                  Close
                </button>
              </div>
            )}

            {!result && (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Make an offer</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">Name your price</h3>
                <p className="mt-2 text-sm text-muted">
                  Listed at &euro;{price}. Meet our price and it&apos;s an instant match &mdash; otherwise we&apos;ll counter.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="number"
                    min="1"
                    required
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder={`Your offer — e.g. €${Math.round(price * 0.85)}`}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className={inputClass}
                  />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {pending ? "Submitting…" : "Submit offer"}
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
