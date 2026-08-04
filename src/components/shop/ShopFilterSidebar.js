import { cookies } from "next/headers";
import FilterPill from "@/components/shop/FilterPill";
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

function Group({ label, children }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// Server-rendered filter sidebar shared by /shop and /shop/[style].
export default async function ShopFilterSidebar({ basePath, params, active, facets, currentStyle = null }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const href = (key, value) => `${basePath}?${toggleParam(params, key, value).toString()}`;
  const singleHref = (key, value) => `${basePath}?${setParam(params, key, value).toString()}`;

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
    <aside className="space-y-6">
      <Group label={t.shAvailability}>
        {availabilityOptions.map((o) => (
          <FilterPill key={o.value} href={singleHref("availability", o.value)} active={active.availability === o.value}>
            {o.label}
          </FilterPill>
        ))}
      </Group>

      <Group label={t.shCategory}>
        {browseCategories.map((c) => (
          <FilterPill key={c} href={href("category", c)} active={active.categories.includes(c)}>
            {catLabel[c] || categoryLabels[c]}
          </FilterPill>
        ))}
      </Group>

      <Group label={t.shType}>
        {clothingTypes.map((type) => {
          const slug = slugify(type);
          return (
            <FilterPill key={type} href={`/shop/${slug}`} active={currentStyle === slug}>
              {typeLabel[type] || type}
            </FilterPill>
          );
        })}
      </Group>

      <Group label={t.shStyle}>
        <FilterPill href="/shop" active={!currentStyle}>
          {t.shAll}
        </FilterPill>
        {styleTags.map((s) => {
          const slug = slugify(s);
          return (
            <FilterPill key={s} href={`/shop/${slug}`} active={currentStyle === slug}>
              {categoryLabel(s)}
            </FilterPill>
          );
        })}
      </Group>

      {facets.sizes.length > 0 && (
        <Group label={t.shFit}>
          {facets.sizes.map((s) => (
            <FilterPill key={s} href={href("size", s)} active={active.sizes.includes(s)}>
              {s}
            </FilterPill>
          ))}
        </Group>
      )}

      {facets.brands.length > 0 && (
        <Group label={t.shBrand}>
          {facets.brands.map((b) => (
            <FilterPill key={b} href={href("brand", b)} active={active.brands.includes(b)}>
              {b}
            </FilterPill>
          ))}
        </Group>
      )}

      <Group label={t.shCondition}>
        {conditions.map((c) => (
          <FilterPill key={c} href={href("condition", c)} active={active.conditions.includes(c)}>
            {condLabel[c] || c}
          </FilterPill>
        ))}
      </Group>

      <Group label={t.shPrice}>
        {priceRanges.map((r) => (
          <FilterPill key={r.id} href={href("price", r.id)} active={active.prices.includes(r.id)}>
            {priceLabel[r.id] || priceRangeLabel(r.id)}
          </FilterPill>
        ))}
      </Group>
    </aside>
  );
}
