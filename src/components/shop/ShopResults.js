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
    <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 0.05} className="h-full">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
