"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { getMyAcceptedOffers } from "@/lib/actions/offers";
import Price from "@/components/Price";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

function thumb(item) {
  return item.image || `https://picsum.photos/seed/${item.slug}/200/260`;
}

export default function CartPage() {
  const { items, removeItem } = useCart();
  const t = getDict(useLocale());
  // This customer's honoured (accepted) offer prices, keyed by product slug.
  const [offers, setOffers] = useState({});
  useEffect(() => {
    let active = true;
    getMyAcceptedOffers().then((m) => {
      if (active) setOffers(m || {});
    });
    return () => {
      active = false;
    };
  }, []);
  const priceOf = (item) => offers[item.slug] ?? item.price;
  const subtotal = items.reduce((sum, it) => sum + priceOf(it), 0);

  if (items.length === 0) {
    return (
      <div className="px-6 py-24">
        <div className="mx-auto max-w-md rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted">
            <BagIcon />
          </div>
          <h1 className="mt-4 text-2xl font-semibold uppercase tracking-tight">{t.prBagEmpty}</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
            {t.prBagEmptyDesc}
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.prBrowseDrop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.prYourBag}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{t.prCartHeading}</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {items.length} {items.length === 1 ? t.prPiece : t.prPieces}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Items */}
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-4 py-5">
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-surface"
                >
                  <Image src={thumb(item)} alt={item.name} fill sizes="80px" className="object-cover grayscale-[30%]" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-accent">{item.brand}</p>
                  <Link href={`/product/${item.slug}`} className="text-sm font-medium transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {item.size ? `${t.prFit} ${item.size} · ` : ""}{t.prOneOfOne}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <p className="font-mono text-sm font-medium">
                    {offers[item.slug] != null && (
                      <span className="mr-1 text-muted line-through"><Price amount={item.price} /></span>
                    )}
                    <Price amount={priceOf(item)} />
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    aria-label={t.prRemoveItem.replace("{name}", item.name)}
                    className="text-muted transition-colors hover:text-red-400"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="h-fit lg:sticky lg:top-24">
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.prSummary}</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <span>{t.prSubtotal}</span>
                  <span className="font-mono text-foreground"><Price amount={subtotal} /></span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>{t.prShipping}</span>
                  <span className="font-mono">{t.prAtCheckout}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-medium">
                <span>{t.prTotal}</span>
                <span className="font-mono"><Price amount={subtotal} /></span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.prProceedToCheckout}
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                {t.prContinueShopping}
              </Link>
            </div>

            <ul className="mt-4 space-y-2 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              <li className="flex items-center gap-2"><Dot /> {t.prTrustShips}</li>
              <li className="flex items-center gap-2"><Dot /> {t.prTrustSecure}</li>
              <li className="flex items-center gap-2"><Dot /> {t.prTrustOneOfOne}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function Dot() {
  return <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />;
}
