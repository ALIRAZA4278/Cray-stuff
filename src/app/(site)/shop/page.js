import Reveal from "@/components/motion/Reveal";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import ShopFilterSidebar from "@/components/shop/ShopFilterSidebar";
import CollapsibleAside from "@/components/shop/CollapsibleAside";
import ActiveFilters from "@/components/shop/ActiveFilters";
import GenderSwitch from "@/components/shop/GenderSwitch";
import BrandDiscovery from "@/components/home/BrandDiscovery";
import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";
import { getAllProducts } from "@/lib/products";
import { getBrandGroups } from "@/lib/brands";
import { sortProducts, filterProducts, getFacets, parseFilters } from "@/lib/shop-filters";

export default async function ShopPage({ searchParams }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const params = await searchParams;
  const active = parseFilters(params);
  const q = params.q || null;
  const sort = params.sort || "new";

  const all = await getAllProducts();
  const facets = getFacets(all);
  const brandGroups = getBrandGroups(all);
  const filtered = filterProducts(all, { ...active, q });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(params);
  // Drives the mobile "Filters (N)" badge so a collapsed panel still says how
  // many filters are narrowing the grid.
  const activeCount =
    active.categories.length + active.sizes.length + active.brands.length +
    active.conditions.length + active.prices.length + active.types.length +
    active.styles.length + (active.availability ? 1 : 0);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.shCuratedOneOfOne}</p>
          <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            {q ? `${t.shSearchLabel}: “${q}”` : t.shTheShop}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            {products.length} {products.length === 1 ? t.shPiece : t.shPieces} {t.shShopCountTail}
          </p>
        </Reveal>

        {!q && (
          <div className="mb-12 border-b border-border pb-12">
            <BrandDiscovery groups={brandGroups} bare />
          </div>
        )}

        <div className="mb-8">
          <GenderSwitch basePath="/shop" params={baseParams} active={active} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <CollapsibleAside activeCount={activeCount}>
            <ShopFilterSidebar basePath="/shop" params={baseParams} active={active} facets={facets} />
          </CollapsibleAside>

          <div>
            <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <ActiveFilters basePath="/shop" params={baseParams} active={active} q={q} />
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:inline">
                  {products.length} {t.shResults}
                </span>
                <SortSelect value={sort} />
              </div>
            </div>
            <ShopResults products={products} clearHref="/shop" />
          </div>
        </div>
      </div>
    </div>
  );
}
