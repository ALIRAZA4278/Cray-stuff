import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import { styleTags } from "@/lib/mock-products";
import { getAllProducts } from "@/lib/products";
import { sortProducts, filterProducts, getFacets } from "@/lib/shop-filters";
import { styleCopy } from "@/lib/style-copy";

export function generateStaticParams() {
  return styleTags.map((style) => ({ style: style.toLowerCase() }));
}

export default async function StyleShopPage({ params, searchParams }) {
  const { style } = await params;
  const styleLabel = styleTags.find((tag) => tag.toLowerCase() === style);

  if (!styleLabel) {
    notFound();
  }

  const search = await searchParams;
  const active = {
    categories: search.category ? search.category.split(",").filter(Boolean) : [],
    sizes: search.size ? search.size.split(",").filter(Boolean) : [],
    brands: search.brand ? search.brand.split(",").filter(Boolean) : [],
    conditions: search.condition ? search.condition.split(",").filter(Boolean) : [],
    maxPrice: Number(search.max) || null,
  };
  const sort = search.sort || "new";
  const basePath = `/shop/${style}`;

  const all = await getAllProducts();
  const facets = getFacets(all);
  const filtered = filterProducts(all, { ...active, style });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(search);
  const hasFilters =
    active.categories.length || active.sizes.length || active.brands.length || active.conditions.length || active.maxPrice;

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="text-3xl font-semibold uppercase tracking-tight">{styleLabel}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{styleCopy[style]}</p>
          <p className="mt-2 text-sm text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"} — every one a one-of-one.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[210px_1fr]">
          <ShopFilterSidebar basePath={basePath} params={baseParams} active={active} facets={facets} currentStyle={style} />
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              {hasFilters ? (
                <Link href={basePath} className="text-sm text-accent hover:opacity-80">
                  Clear all
                </Link>
              ) : (
                <span />
              )}
              <SortSelect value={sort} />
            </div>
            <ShopResults products={products} clearHref={basePath} />
          </div>
        </div>
      </div>
    </div>
  );
}
