import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";
import Reveal from "@/components/motion/Reveal";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import CollapsibleAside from "@/components/shop/CollapsibleAside";
import ActiveFilters from "@/components/shop/ActiveFilters";
import GenderSwitch from "@/components/shop/GenderSwitch";
import { styleTags } from "@/lib/mock-products";
import { getAllProducts } from "@/lib/products";
import { sortProducts, filterProducts, getFacets, clothingTypes, slugify, parseFilters, tagGroupForSlug } from "@/lib/shop-filters";
import { styleCopy } from "@/lib/style-copy";

// One route serves both style edits (Vintage, Y2K…) and clothing types
// (Shorts, Hoodies…) — both live on a product's tags.
const browsableTags = [...styleTags, ...clothingTypes];

export function generateStaticParams() {
  return browsableTags.map((tag) => ({ style: slugify(tag) }));
}

export default async function StyleShopPage({ params, searchParams }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const { style } = await params;
  const styleLabel = browsableTags.find((tag) => slugify(tag) === style);

  if (!styleLabel) {
    notFound();
  }

  const search = await searchParams;
  const sort = search.sort || "new";

  // The route slug is just a pre-applied filter value now. Seeding it into the
  // matching group (type vs style) means every control on the page can combine
  // with it — /shop/vintage + Jackets narrows down instead of navigating away
  // and losing the edit. The landing copy above stays for SEO.
  const routeGroup = tagGroupForSlug(style);
  const active = parseFilters(search);
  if (!active[routeGroup === "type" ? "types" : "styles"].includes(style)) {
    active[routeGroup === "type" ? "types" : "styles"].push(style);
  }

  // Filter controls all target /shop and carry the seeded slug in the query, so
  // adding a second filter folds this landing page into the full catalog.
  const basePath = "/shop";
  const baseParams = new URLSearchParams(search);
  baseParams.set(routeGroup, active[routeGroup === "type" ? "types" : "styles"].join(","));

  const all = await getAllProducts();
  const facets = getFacets(all);
  const filtered = filterProducts(all, active);
  const products = sortProducts(filtered, sort);
  const activeCount =
    active.categories.length + active.sizes.length + active.brands.length +
    active.conditions.length + active.prices.length + active.types.length +
    active.styles.length + (active.availability ? 1 : 0);

  const localizedCopy = {
    vintage: t.shCopyVintage,
    y2k: t.shCopyY2k,
    skate: t.shCopySkate,
    archive: t.shCopyArchive,
    "just-swag": t.shCopyJustSwag,
    outerwear: t.shCopyOuterwear,
    hoodies: t.shCopyHoodies,
    "t-shirts": t.shCopyTShirts,
    "long-sleeves": t.shCopyLongSleeves,
    pants: t.shCopyPants,
    shorts: t.shCopyShorts,
    accessories: t.shCopyAccessories,
  };

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.shCuratedEdit}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            {styleLabel === "Archive" ? "Designer" : styleLabel}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{localizedCopy[style] || styleCopy[style]}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {products.length} {products.length === 1 ? t.shPiece : t.shPieces} {t.shStyleCountTail}
          </p>
        </Reveal>

        <div className="mb-8">
          <GenderSwitch basePath={basePath} params={baseParams} active={active} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <CollapsibleAside activeCount={activeCount}>
            <ShopFilterSidebar basePath={basePath} params={baseParams} active={active} facets={facets} />
          </CollapsibleAside>

          <div>
            <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <ActiveFilters basePath={basePath} params={baseParams} active={active} q={null} />
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:inline">
                  {products.length} {t.shResults}
                </span>
                <SortSelect value={sort} />
              </div>
            </div>
            <ShopResults products={products} clearHref={`/shop/${style}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
