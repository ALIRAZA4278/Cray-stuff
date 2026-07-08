"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { items, removeItem, subtotal } = useCart();

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold uppercase tracking-tight">Cart</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center text-muted">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="mt-3 inline-block text-sm text-accent hover:opacity-80">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wide text-accent">{item.brand}</p>
                    <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:text-accent">
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-mono text-sm font-medium">&euro;{item.price}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`Remove ${item.name}`}
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono text-lg font-medium">&euro;{subtotal}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Shipping and any accepted offers are calculated at checkout.</p>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Proceed to checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
