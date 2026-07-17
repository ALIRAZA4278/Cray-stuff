import FilterPill from "@/components/shop/FilterPill";
import { styleTags } from "@/lib/mock-products";
import {
  browseCategories,
  categoryLabels,
  clothingTypes,
  conditions,
  priceRanges,
  slugify,
  toggleParam,
  setParam,
} from "@/lib/shop-filters";

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
];

function Group({ label, children }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// Server-rendered filter sidebar shared by /shop and /shop/[style].
export default function ShopFilterSidebar({ basePath, params, active, facets, currentStyle = null }) {
  const href = (key, value) => `${basePath}?${toggleParam(params, key, value).toString()}`;
  const singleHref = (key, value) => `${basePath}?${setParam(params, key, value).toString()}`;

  return (
    <aside className="space-y-6">
      <Group label="Availability">
        {availabilityOptions.map((o) => (
          <FilterPill key={o.value} href={singleHref("availability", o.value)} active={active.availability === o.value}>
            {o.label}
          </FilterPill>
        ))}
      </Group>

      <Group label="Category">
        {browseCategories.map((c) => (
          <FilterPill key={c} href={href("category", c)} active={active.categories.includes(c)}>
            {categoryLabels[c]}
          </FilterPill>
        ))}
      </Group>

      <Group label="Type">
        {clothingTypes.map((t) => {
          const slug = slugify(t);
          return (
            <FilterPill key={t} href={`/shop/${slug}`} active={currentStyle === slug}>
              {t}
            </FilterPill>
          );
        })}
      </Group>

      <Group label="Style">
        <FilterPill href="/shop" active={!currentStyle}>
          All
        </FilterPill>
        {styleTags.map((s) => {
          const slug = slugify(s);
          return (
            <FilterPill key={s} href={`/shop/${slug}`} active={currentStyle === slug}>
              {s}
            </FilterPill>
          );
        })}
      </Group>

      {facets.sizes.length > 0 && (
        <Group label="Size">
          {facets.sizes.map((s) => (
            <FilterPill key={s} href={href("size", s)} active={active.sizes.includes(s)}>
              {s}
            </FilterPill>
          ))}
        </Group>
      )}

      {facets.brands.length > 0 && (
        <Group label="Brand">
          {facets.brands.map((b) => (
            <FilterPill key={b} href={href("brand", b)} active={active.brands.includes(b)}>
              {b}
            </FilterPill>
          ))}
        </Group>
      )}

      <Group label="Condition">
        {conditions.map((c) => (
          <FilterPill key={c} href={href("condition", c)} active={active.conditions.includes(c)}>
            {c}
          </FilterPill>
        ))}
      </Group>

      <Group label="Price">
        {priceRanges.map((r) => (
          <FilterPill key={r.id} href={href("price", r.id)} active={active.prices.includes(r.id)}>
            {r.label}
          </FilterPill>
        ))}
      </Group>
    </aside>
  );
}
