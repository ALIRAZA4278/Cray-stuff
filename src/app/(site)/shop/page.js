import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import StyleFilterRow from "@/components/shop/StyleFilterRow";
import CategoryFilterRow from "@/components/shop/CategoryFilterRow";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import { mockProducts } from "@/lib/mock-products";
import { sortProducts } from "@/lib/shop-filters";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const activeCategories = params.category ? params.category.split(",").filter(Boolean) : [];
  const maxPrice = Number(params.max) || null;
  const sort = params.sort || "new";

  const filtered = mockProducts.filter((product) => {
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
    const matchesPrice = !maxPrice || product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(params);
  const hasFilters = activeCategories.length > 0 || Boolean(maxPrice);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="text-3xl font-semibold uppercase tracking-tight">Shop</h1>
          <p className="mt-2 text-sm text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {maxPrice ? ` under €${maxPrice}` : ""} — every one a one-of-one.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryFilterRow basePath="/shop" activeCategories={activeCategories} params={baseParams} />
            <span className="mx-1 h-4 w-px bg-border" />
            <StyleFilterRow currentStyle={null} />
          </div>
          <div className="flex items-center justify-between gap-4">
            {hasFilters ? (
              <Link href="/shop" className="text-sm text-accent hover:opacity-80">
                Clear filters
              </Link>
            ) : (
              <span />
            )}
            <SortSelect value={sort} />
          </div>
        </Reveal>

        <ShopResults products={products} clearHref="/shop" />
      </div>
    </div>
  );
}
