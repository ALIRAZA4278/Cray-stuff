import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import { getAllProducts } from "@/lib/products";
import { sortProducts, filterProducts, getFacets } from "@/lib/shop-filters";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const active = {
    categories: params.category ? params.category.split(",").filter(Boolean) : [],
    sizes: params.size ? params.size.split(",").filter(Boolean) : [],
    brands: params.brand ? params.brand.split(",").filter(Boolean) : [],
    conditions: params.condition ? params.condition.split(",").filter(Boolean) : [],
    maxPrice: Number(params.max) || null,
  };
  const q = params.q || null;
  const sort = params.sort || "new";

  const all = await getAllProducts();
  const facets = getFacets(all);
  const filtered = filterProducts(all, { ...active, q });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(params);
  const hasFilters =
    active.categories.length ||
    active.sizes.length ||
    active.brands.length ||
    active.conditions.length ||
    active.maxPrice ||
    q;

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="text-3xl font-semibold uppercase tracking-tight">Shop</h1>
          <p className="mt-2 text-sm text-muted">
            {q ? `Results for “${q}” — ` : ""}
            {products.length} {products.length === 1 ? "piece" : "pieces"} — every one a one-of-one.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[210px_1fr]">
          <ShopFilterSidebar basePath="/shop" params={baseParams} active={active} facets={facets} currentStyle={null} />
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              {hasFilters ? (
                <Link href="/shop" className="text-sm text-accent hover:opacity-80">
                  Clear all
                </Link>
              ) : (
                <span />
              )}
              <SortSelect value={sort} />
            </div>
            <ShopResults products={products} clearHref="/shop" />
          </div>
        </div>
      </div>
    </div>
  );
}
