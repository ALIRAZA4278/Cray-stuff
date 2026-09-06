import Link from "next/link";
import { cookies } from "next/headers";
import { getDict } from "@/lib/i18n";
import { browseCategories } from "@/lib/shop-filters";

// Men's / Women's as the first choice in the catalog, not a pill buried in the
// sidebar. Someone shopping menswear should not have to scan a grid half full
// of womenswear to find it.
//
// Single-select by design: picking one replaces the other, and "Everyone" clears
// the choice. Unisex pieces surface under both (see matchesCategory).
export default async function GenderSwitch({ basePath, params, active }) {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  const label = { mens: t.shCatMens, womens: t.shCatWomens };

  const hrefFor = (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set("category", value);
    else next.delete("category");
    const qs = next.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const options = [{ value: null, label: t.shEveryone }, ...browseCategories.map((c) => ({ value: c, label: label[c] }))];
  const current = active.categories.length === 1 ? active.categories[0] : null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.shShopFor}</span>
      <div className="inline-flex rounded-full border border-border p-1">
        {options.map((o) => {
          const isActive = current === o.value;
          return (
            <Link
              key={o.value ?? "all"}
              href={hrefFor(o.value)}
              scroll={false}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                isActive ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {o.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
