import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProductCarousel from "@/components/home/ProductCarousel";

export default function ProductGrid({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel = "View all",
  products,
  plain = false,
}) {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {!plain && (
          <Reveal className="mb-8 text-center">
            {eyebrow && (
              <p className="flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest text-accent">
                <span aria-hidden className="h-px w-10 bg-border" />
                {eyebrow}
                <span aria-hidden className="h-px w-10 bg-border" />
              </p>
            )}
            <h2 className="mt-2 text-2xl font-semibold uppercase tracking-tight sm:text-3xl">{title}</h2>
            <Link
              href={viewAllHref}
              className="mt-3 inline-block text-sm uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              {viewAllLabel} &rarr;
            </Link>
          </Reveal>
        )}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
