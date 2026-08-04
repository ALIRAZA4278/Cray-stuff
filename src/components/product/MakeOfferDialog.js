"use client";

import { useState } from "react";
import { submitOffer } from "@/lib/actions/offers";
import { useRequireLogin } from "@/lib/AuthContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

const inputClass =
  "w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export default function MakeOfferDialog({ product }) {
  const { slug, name: productName, price, minOffer } = product;
  const { format } = useCurrency();
  const t = getDict(useLocale());
  const run = useRequireLogin();
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const res = await submitOffer({ slug, productName, listPrice: price, minOffer, offer: Number(offer) });
    setPending(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setSent(true);
  }

  function close() {
    setOpen(false);
    setSent(false);
    setOffer("");
    setError(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => run(() => setOpen(true))}
        className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
      >
        {t.prMakeOffer}
      </button>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-6">
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-background p-8">
            <button
              type="button"
              onClick={close}
              aria-label={t.prClose}
              className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {sent ? (
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.prOfferSent}</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">{t.prWellBeInTouch}</h3>
                <p className="mt-2 text-sm text-muted">{t.prPendingNote.replace("{offer}", format(Number(offer)))}</p>
                <button type="button" onClick={close} className="mt-6 text-sm text-muted hover:text-foreground">
                  {t.prClose}
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.prMakeOffer}</p>
                <h3 className="mt-3 text-lg font-semibold uppercase tracking-tight">{t.prNameYourPrice}</h3>
                <p className="mt-2 text-sm text-muted">{t.prListedAt.replace("{price}", format(price))}</p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="number"
                    min="1"
                    required
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    placeholder={t.prOfferPlaceholder.replace("{price}", format(Math.round(price * 0.85)))}
                    className={inputClass}
                  />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {pending ? t.prSubmitting : t.prSubmitOffer}
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
