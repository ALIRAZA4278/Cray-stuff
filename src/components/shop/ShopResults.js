import Link from "next/link";
import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";
import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/product/ProductCard";

export default async function ShopResults({ products, clearHref }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  if (products.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        <p>{t.shNoMatch}</p>
        <Link href={clearHref} className="mt-3 inline-block text-sm text-accent hover:opacity-80">
          {t.shClearFilters}
        </Link>
      </div>
    );
  }

  return (
    // Two per row on mobile instead of one — a single-column grid meant endless
    // scrolling for a 700-piece catalog. Three across on desktop up to 2xl so the
    // photos render meaningfully larger; the detail in Wiktor's shots was being
    // lost at four-up.
    <div className="mt-8 grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 0.05} className="h-full">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
