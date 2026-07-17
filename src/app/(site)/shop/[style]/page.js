import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import CollapsibleAside from "@/components/shop/CollapsibleAside";
import ActiveFilters from "@/components/shop/ActiveFilters";
import { styleTags } from "@/lib/mock-products";
import { getAllProducts } from "@/lib/products";
import { sortProducts, filterProducts, getFacets, clothingTypes, slugify } from "@/lib/shop-filters";
import { styleCopy } from "@/lib/style-copy";

// One route serves both style edits (Vintage, Y2K…) and clothing types
// (Shorts, Hoodies…) — both live on a product's tags.
const browsableTags = [...styleTags, ...clothingTypes];

export function generateStaticParams() {
  return browsableTags.map((tag) => ({ style: slugify(tag) }));
}

export default async function StyleShopPage({ params, searchParams }) {
  const { style } = await params;
  const styleLabel = browsableTags.find((tag) => slugify(tag) === style);

  if (!styleLabel) {
    notFound();
  }

  const search = await searchParams;
  const active = {
    categories: search.category ? search.category.split(",").filter(Boolean) : [],
    sizes: search.size ? search.size.split(",").filter(Boolean) : [],
    brands: search.brand ? search.brand.split(",").filter(Boolean) : [],
    conditions: search.condition ? search.condition.split(",").filter(Boolean) : [],
    prices: search.price ? search.price.split(",").filter(Boolean) : [],
    availability: search.availability || null,
  };
  const sort = search.sort || "new";
  const basePath = `/shop/${style}`;

  const all = await getAllProducts();
  const facets = getFacets(all);
  const filtered = filterProducts(all, { ...active, style });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(search);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Curated edit</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{styleLabel}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{styleCopy[style]}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"} — every one a one-of-one
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <CollapsibleAside>
            <ShopFilterSidebar basePath={basePath} params={baseParams} active={active} facets={facets} currentStyle={style} />
          </CollapsibleAside>

          <div>
            <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <ActiveFilters basePath={basePath} params={baseParams} active={active} q={null} />
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:inline">
                  {products.length} results
                </span>
                <SortSelect value={sort} />
              </div>
            </div>
            <ShopResults products={products} clearHref={basePath} />
          </div>
        </div>
      </div>
    </div>
  );
}
