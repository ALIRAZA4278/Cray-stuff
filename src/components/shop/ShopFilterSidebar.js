import FilterPill from "@/components/shop/FilterPill";
import { categories, styleTags } from "@/lib/mock-products";
import { categoryLabels, toggleParam } from "@/lib/shop-filters";

const PRICE_PRESETS = [
  { label: "Under €100", max: 100 },
  { label: "Under €150", max: 150 },
  { label: "Under €200", max: 200 },
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
  function priceHref(max) {
    const next = new URLSearchParams(params);
    if (active.maxPrice === max) next.delete("max");
    else next.set("max", String(max));
    const qs = next.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  return (
    <aside className="space-y-6">
      <Group label="Category">
        {categories.map((c) => (
          <FilterPill
            key={c}
            href={`${basePath}?${toggleParam(params, "category", c).toString()}`}
            active={active.categories.includes(c)}
          >
            {categoryLabels[c]}
          </FilterPill>
        ))}
      </Group>

      <Group label="Style">
        <FilterPill href="/shop" active={!currentStyle}>
          All
        </FilterPill>
        {styleTags.map((s) => {
          const slug = s.toLowerCase();
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
            <FilterPill key={s} href={`${basePath}?${toggleParam(params, "size", s).toString()}`} active={active.sizes.includes(s)}>
              {s}
            </FilterPill>
          ))}
        </Group>
      )}

      {facets.brands.length > 0 && (
        <Group label="Brand">
          {facets.brands.map((b) => (
            <FilterPill key={b} href={`${basePath}?${toggleParam(params, "brand", b).toString()}`} active={active.brands.includes(b)}>
              {b}
            </FilterPill>
          ))}
        </Group>
      )}

      {facets.conditions.length > 0 && (
        <Group label="Condition">
          {facets.conditions.map((c) => (
            <FilterPill key={c} href={`${basePath}?${toggleParam(params, "condition", c).toString()}`} active={active.conditions.includes(c)}>
              {c}
            </FilterPill>
          ))}
        </Group>
      )}

      <Group label="Price">
        {PRICE_PRESETS.map((p) => (
          <FilterPill key={p.max} href={priceHref(p.max)} active={active.maxPrice === p.max}>
            {p.label}
          </FilterPill>
        ))}
      </Group>
    </aside>
  );
}
