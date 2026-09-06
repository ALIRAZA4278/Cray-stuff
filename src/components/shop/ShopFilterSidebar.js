import { cookies } from "next/headers";
import FilterPill from "@/components/shop/FilterPill";
import FilterGroup from "@/components/shop/FilterGroup";
import { getDict } from "@/lib/i18n";
import { styleTags } from "@/lib/mock-products";
import { categoryLabel } from "@/lib/category-label";
import {
  browseCategories,
  categoryLabels,
  clothingTypes,
  conditions,
  priceRanges,
  priceRangeLabel,
  slugify,
  toggleParam,
  setParam,
} from "@/lib/shop-filters";

// Server-rendered filter sidebar shared by /shop and /shop/[style].
//
// Every group writes to a query param, so groups intersect (Shorts + Y2K) instead
// of replacing each other. Type and Style used to be routes — /shop/vintage,
// /shop/shorts — which made them mutually exclusive by construction and gave
// them no way to be deselected. They are `?type=` and `?style=` now, and the
// pills always target /shop so a style landing page folds into the full catalog
// as soon as a second filter is added.
export default async function ShopFilterSidebar({ basePath, params, active, facets }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  // Deselecting the last filter should land on a clean `/shop`, not `/shop?`.
  const withQuery = (next) => {
    const qs = next.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const href = (key, value) => withQuery(toggleParam(params, key, value));
  const singleHref = (key, value) => withQuery(setParam(params, key, value));
  // "All" clears just that group and leaves every other filter alone.
  const clearHref = (key) => {
    const next = new URLSearchParams(params);
    next.delete(key);
    return withQuery(next);
  };

  const availabilityOptions = [
    { value: "available", label: t.shAvailable },
    { value: "sold", label: t.shSold },
  ];
  const catLabel = { mens: t.shCatMens, womens: t.shCatWomens, unisex: t.shCatUnisex };
  const typeLabel = {
    Outerwear: t.shTypeOuterwear,
    Hoodies: t.shTypeHoodies,
    "T-Shirts": t.shTypeTShirts,
    "Long Sleeves": t.shTypeLongSleeves,
    Pants: t.shTypePants,
    Shorts: t.shTypeShorts,
    Accessories: t.shTypeAccessories,
  };
  const condLabel = {
    Excellent: t.shCondExcellent,
    "Very Good": t.shCondVeryGood,
    Good: t.shCondGood,
    "Like New": t.shCondLikeNew,
  };
  const priceLabel = {
    "0-50": t.shPrice0_50,
    "50-100": t.shPrice50_100,
    "100-150": t.shPrice100_150,
    "150-": t.shPrice150,
  };

  return (
    <aside className="space-y-4">
      <FilterGroup label={t.shAvailability}>
        <FilterPill href={clearHref("availability")} active={!active.availability}>
          {t.shAll}
        </FilterPill>
        {availabilityOptions.map((o) => (
          <FilterPill key={o.value} href={singleHref("availability", o.value)} active={active.availability === o.value}>
            {o.label}
          </FilterPill>
        ))}
      </FilterGroup>

      <FilterGroup label={t.shCategory}>
        <FilterPill href={clearHref("category")} active={active.categories.length === 0}>
          {t.shAll}
        </FilterPill>
        {browseCategories.map((c) => (
          <FilterPill key={c} href={href("category", c)} active={active.categories.includes(c)}>
            {catLabel[c] || categoryLabels[c]}
          </FilterPill>
        ))}
      </FilterGroup>

      <FilterGroup label={t.shType}>
        <FilterPill href={clearHref("type")} active={active.types.length === 0}>
          {t.shAll}
        </FilterPill>
        {clothingTypes.map((type) => {
          const slug = slugify(type);
          return (
            <FilterPill key={type} href={href("type", slug)} active={active.types.includes(slug)}>
              {typeLabel[type] || type}
            </FilterPill>
          );
        })}
      </FilterGroup>

      <FilterGroup label={t.shStyle}>
        <FilterPill href={clearHref("style")} active={active.styles.length === 0}>
          {t.shAll}
        </FilterPill>
        {styleTags.map((s) => {
          const slug = slugify(s);
          return (
            <FilterPill key={s} href={href("style", slug)} active={active.styles.includes(slug)}>
              {categoryLabel(s)}
            </FilterPill>
          );
        })}
      </FilterGroup>

      {facets.sizes.length > 0 && (
        <FilterGroup label={t.shFit}>
          <FilterPill href={clearHref("size")} active={active.sizes.length === 0}>
            {t.shAll}
          </FilterPill>
          {facets.sizes.map((s) => (
            <FilterPill key={s} href={href("size", s)} active={active.sizes.includes(s)}>
              {s}
            </FilterPill>
          ))}
        </FilterGroup>
      )}

      {facets.brands.length > 0 && (
        <FilterGroup label={t.shBrand} previewCount={8}>
          <FilterPill href={clearHref("brand")} active={active.brands.length === 0}>
            {t.shAll}
          </FilterPill>
          {facets.brands.map((b) => (
            <FilterPill key={b} href={href("brand", b)} active={active.brands.includes(b)}>
              {b}
            </FilterPill>
          ))}
        </FilterGroup>
      )}

      <FilterGroup label={t.shCondition} defaultOpen={false}>
        <FilterPill href={clearHref("condition")} active={active.conditions.length === 0}>
          {t.shAll}
        </FilterPill>
        {conditions.map((c) => (
          <FilterPill key={c} href={href("condition", c)} active={active.conditions.includes(c)}>
            {condLabel[c] || c}
          </FilterPill>
        ))}
      </FilterGroup>

      <FilterGroup label={t.shPrice} defaultOpen={false}>
        <FilterPill href={clearHref("price")} active={active.prices.length === 0}>
          {t.shAll}
        </FilterPill>
        {priceRanges.map((r) => (
          <FilterPill key={r.id} href={href("price", r.id)} active={active.prices.includes(r.id)}>
            {priceLabel[r.id] || priceRangeLabel(r.id)}
          </FilterPill>
        ))}
      </FilterGroup>
    </aside>
  );
}
