// Curated list of designer / high-end labels. A brand only appears in the
// "Designer" rail when it's actually in the live catalog, so the row is never
// padded with names we don't stock.
const DESIGNER_BRANDS = [
  "Kapital",
  "Stone Island",
  "Comme des Garçons",
  "Yohji Yamamoto",
  "Maison Margiela",
  "Rick Owens",
  "Raf Simons",
  "Ralph Lauren",
  "The North Face",
  "Arc'teryx",
];

// Manual override for the 🔥 Fire rail. Leave empty to keep it fully automatic
// (ranked by Fire count). Add brand names here to pin exactly what shows, e.g.
// MANUAL_FIRE_BRANDS = ["Ed Hardy", "Rocawear"].
export const MANUAL_FIRE_BRANDS = [];

// Groups catalog brands into the three storefront rails.
// - fire: brands of the most saved pieces (auto — highest total Fire count),
//         unless MANUAL_FIRE_BRANDS is set, which wins.
// - hot:  brands with the most pieces live right now (auto)
// - designer: curated high-end labels that are actually in stock
export function getBrandGroups(products) {
  const byBrand = new Map();
  for (const p of products) {
    if (!p.brand) continue;
    const entry = byBrand.get(p.brand) || { brand: p.brand, fire: 0, count: 0 };
    entry.fire += p.fireCount || 0;
    entry.count += 1;
    byBrand.set(p.brand, entry);
  }
  const brands = [...byBrand.values()];

  const autoFire = [...brands]
    .filter((b) => b.fire > 0)
    .sort((a, b) => b.fire - a.fire)
    .slice(0, 8)
    .map((b) => b.brand);

  // Manual list wins when set — but only for brands actually in the catalog.
  const pinned = MANUAL_FIRE_BRANDS.filter((name) =>
    brands.some((b) => b.brand.toLowerCase() === String(name).toLowerCase())
  );
  const fire = pinned.length ? pinned : autoFire;

  const hot = [...brands]
    .sort((a, b) => b.count - a.count || b.fire - a.fire)
    .slice(0, 8)
    .map((b) => b.brand);

  const designer = brands
    .filter((b) => DESIGNER_BRANDS.some((d) => d.toLowerCase() === b.brand.toLowerCase()))
    .map((b) => b.brand);

  return { fire, hot, designer };
}
