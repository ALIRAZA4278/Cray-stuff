export const categoryLabels = { mens: "Men's", womens: "Women's", unisex: "Unisex" };

// Browsable gender buckets. Unisex is intentionally not here — unisex pieces
// surface under BOTH Men's and Women's rather than living in a separate bucket.
export const browseCategories = ["mens", "womens"];

// Fixed condition grades shoppers filter by (always shown, not derived from stock).
export const conditions = ["Excellent", "Very Good", "Good", "Like New"];

// Clothing types (what the piece IS) — separate from style tags (its vibe).
// Stored on the product's `tags`, so a piece can be e.g. ["Y2K", "Shorts"].
export const clothingTypes = ["Outerwear", "Hoodies", "T-Shirts", "Long Sleeves", "Pants", "Shorts", "Accessories"];

// "Long Sleeves" -> "long-sleeves" so labels survive a round trip through URLs.
export function slugify(label) {
  return String(label).toLowerCase().trim().replace(/\s+/g, "-");
}

// Price brackets. Bounds are inclusive on both ends — with multi-select the
// boundary overlap just means a $100 piece shows under either neighbouring band.
export const priceRanges = [
  { id: "0-50", label: "Under $50", min: 0, max: 50 },
  { id: "50-100", label: "$50–$100", min: 50, max: 100 },
  { id: "100-150", label: "$100–$150", min: 100, max: 150 },
  { id: "150-", label: "$150+", min: 150, max: null },
];

export function priceRangeLabel(id) {
  return priceRanges.find((r) => r.id === id)?.label ?? id;
}

export function sortProducts(products, sort) {
  if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...products].sort((a, b) => b.price - a.price);
  if (sort === "popular") return [...products].sort((a, b) => b.fireCount - a.fireCount);
  // Available pieces first, newest within each group. `products` already
  // arrives newest-first from getAllProducts, so a stable partition is enough.
  if (sort === "available") return [...products].sort((a, b) => Number(a.sold) - Number(b.sold));
  return products;
}

// Unique filter options ("facets") derived from the live catalog.
export function getFacets(products) {
  const uniq = (arr) => [...new Set(arr.filter(Boolean))];
  return {
    sizes: uniq(products.map((p) => p.size)).sort(),
    brands: uniq(products.map((p) => p.brand)).sort(),
  };
}

// True when a product belongs in the selected gender buckets. Unisex pieces
// count as a match whenever Men's or Women's is being browsed.
function matchesCategory(product, categories) {
  if (categories.includes(product.category)) return true;
  const genderBrowse = categories.some((c) => c === "mens" || c === "womens");
  return product.category === "unisex" && genderBrowse;
}

function matchesPrice(product, prices) {
  const active = priceRanges.filter((r) => prices.includes(r.id));
  return active.some((r) => product.price >= r.min && (r.max == null || product.price <= r.max));
}

// True when the product carries at least one of the given tag slugs. Used for
// both style edits (Vintage, Y2K…) and clothing types (Shorts, Hoodies…) —
// both live on `product.tags`.
function matchesTagSlugs(product, slugs) {
  return product.tags.some((tag) => slugs.includes(slugify(tag)));
}

// Applies every active filter. Groups combine with AND (Shorts AND Y2K), values
// inside one group combine with OR (Shorts OR Hoodies) — so "Vintage + Jackets"
// narrows down instead of one filter replacing the other.
export function filterProducts(products, filters = {}) {
  const {
    categories = [],
    sizes = [],
    brands = [],
    conditions = [],
    prices = [],
    types = [],
    styles = [],
    availability = null,
    q = null,
  } = filters;
  const query = q ? q.trim().toLowerCase() : null;

  return products.filter((product) => {
    if (availability === "available" && product.sold) return false;
    if (availability === "sold" && !product.sold) return false;
    if (categories.length && !matchesCategory(product, categories)) return false;
    if (sizes.length && !sizes.includes(product.size)) return false;
    if (brands.length && !brands.includes(product.brand)) return false;
    if (conditions.length && !conditions.includes(product.condition)) return false;
    if (prices.length && !matchesPrice(product, prices)) return false;
    // Separate groups so a type and a style intersect rather than compete.
    if (types.length && !matchesTagSlugs(product, types)) return false;
    if (styles.length && !matchesTagSlugs(product, styles)) return false;
    if (query) {
      const haystack = `${product.name} ${product.brand} ${product.tags.join(" ")} ${product.description || ""}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

const csv = (value) => (value ? String(value).split(",").filter(Boolean) : []);

// Single place that turns a searchParams object into the filter shape every
// consumer expects, so /shop and /shop/[style] can't drift apart.
export function parseFilters(params = {}) {
  return {
    categories: csv(params.category),
    sizes: csv(params.size),
    brands: csv(params.brand),
    conditions: csv(params.condition),
    prices: csv(params.price),
    types: csv(params.type),
    styles: csv(params.style),
    availability: params.availability || null,
  };
}

// Is this slug a clothing type (Shorts) or a style edit (Y2K)? Decides which
// filter group a /shop/[style] landing page seeds.
export function tagGroupForSlug(slug) {
  return clothingTypes.some((type) => slugify(type) === slug) ? "type" : "style";
}

// Single-select param: clicking the active value clears it, otherwise it
// replaces whatever was there (used for Availability — Available vs Sold).
export function setParam(params, key, value) {
  const next = new URLSearchParams(params);
  if (next.get(key) === value) next.delete(key);
  else next.set(key, value);
  return next;
}

export function toggleParam(params, key, value) {
  const next = new URLSearchParams(params);
  const current = next.get(key)?.split(",").filter(Boolean) ?? [];
  const isActive = current.includes(value);
  const updated = isActive ? current.filter((item) => item !== value) : [...current, value];

  if (updated.length) {
    next.set(key, updated.join(","));
  } else {
    next.delete(key);
  }

  return next;
}
