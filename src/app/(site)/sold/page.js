import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/products";

export const revalidate = 60;

export const metadata = {
  title: "Recently Sold — CRAY STUFF",
  description: "The pieces that already found a new home. Every one was a one-of-one — once it's gone, it's gone.",
};

export default async function SoldPage() {
  const products = await getAllProducts();
  const sold = products.filter((p) => p.sold);

  return (
    <div className="relative overflow-hidden px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">The archive</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-5xl">Recently sold</h1>
          {sold.length > 0 && (
            <p className="mx-auto mt-4 flex items-baseline justify-center gap-2 font-display text-5xl font-semibold uppercase tracking-tight text-accent sm:text-6xl">
              <CountUp to={sold.length} />
              <span className="text-2xl sm:text-3xl">gone</span>
            </p>
          )}
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Every piece here was a one-of-one and already found a new home. Nothing gets restocked — this is what you
            miss when you wait.
          </p>
        </Reveal>

        {sold.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-border bg-surface p-12 text-center">
            <p className="text-sm text-muted">Nothing archived yet — sold pieces will appear here.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sold.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.05} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-6 text-center sm:text-left">
            <div>
              <p className="text-base font-medium">Don&apos;t miss the next one.</p>
              <p className="mt-1 text-sm text-muted">New pieces drop every week — and they go just as fast.</p>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop what&apos;s live
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
