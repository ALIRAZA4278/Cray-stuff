import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProductCarousel from "@/components/home/ProductCarousel";

export default function ProductGrid({ eyebrow, title, viewAllHref, products }) {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 flex items-end justify-between">
          <div>
            {eyebrow && (
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
            )}
            <h2 className="text-xl font-semibold uppercase tracking-tight">{title}</h2>
          </div>
          <Link href={viewAllHref} className="text-sm text-accent hover:opacity-80">
            View all
          </Link>
        </Reveal>
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
