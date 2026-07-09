"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

function thumb(item) {
  return item.image || `https://picsum.photos/seed/${item.slug}/200/260`;
}

export default function CartPage() {
  const { items, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-6 py-24">
        <div className="mx-auto max-w-md rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted">
            <BagIcon />
          </div>
          <h1 className="mt-4 text-2xl font-semibold uppercase tracking-tight">Your bag is empty</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
            One-of-one pieces don&apos;t wait around. Find something before it&apos;s gone.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Browse the drop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Your bag</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Cart</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
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
                    {item.size ? `Size ${item.size} · ` : ""}One of one
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <p className="font-mono text-sm font-medium">&euro;{item.price}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name}`}
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
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-mono text-foreground">&euro;{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="font-mono">At checkout</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-medium">
                <span>Total</span>
                <span className="font-mono">&euro;{subtotal}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Proceed to checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                Continue shopping
              </Link>
            </div>

            <ul className="mt-4 space-y-2 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              <li className="flex items-center gap-2"><Dot /> Ships within 24 hours</li>
              <li className="flex items-center gap-2"><Dot /> Secure checkout — BLIK, card, Apple/Google Pay</li>
              <li className="flex items-center gap-2"><Dot /> One-of-one — once it&apos;s gone, it&apos;s gone</li>
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
