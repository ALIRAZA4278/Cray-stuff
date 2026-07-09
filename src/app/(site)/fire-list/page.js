"use client";

import Link from "next/link";
import { useFireList } from "@/lib/FireListContext";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/motion/Reveal";

export default function FireListPage() {
  const { items } = useFireList();

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Your Fire List</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Saved pieces</h1>
            {items.length > 0 && (
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </span>
            )}
          </div>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Every piece is one-of-one. When something on your Fire List drops in price, you&apos;ll be the first to know.
          </p>
        </Reveal>

        {items.length === 0 ? (
          <Reveal delay={0.05}>
            <div className="mt-10 rounded-lg border border-dashed border-border bg-surface p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-semibold uppercase tracking-tight">Nothing saved yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                Tap the heart on any piece to add it here. One-of-one means once it&apos;s gone, it&apos;s gone.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Browse the drop
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {items.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.04}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
