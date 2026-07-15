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
// boundary overlap just means a €100 piece shows under either neighbouring band.
export const priceRanges = [
  { id: "0-50", label: "Under €50", min: 0, max: 50 },
  { id: "50-100", label: "€50–€100", min: 50, max: 100 },
  { id: "100-150", label: "€100–€150", min: 100, max: 150 },
  { id: "150-", label: "€150+", min: 150, max: null },
];

export function priceRangeLabel(id) {
  return priceRanges.find((r) => r.id === id)?.label ?? id;
}

export function sortProducts(products, sort) {
  if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...products].sort((a, b) => b.price - a.price);
  if (sort === "popular") return [...products].sort((a, b) => b.fireCount - a.fireCount);
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

// Applies every active filter (category, size, brand, condition, price, style, search).
export function filterProducts(products, filters = {}) {
  const { categories = [], sizes = [], brands = [], conditions = [], prices = [], style = null, q = null } = filters;
  const query = q ? q.trim().toLowerCase() : null;

  return products.filter((product) => {
    if (categories.length && !matchesCategory(product, categories)) return false;
    if (sizes.length && !sizes.includes(product.size)) return false;
    if (brands.length && !brands.includes(product.brand)) return false;
    if (conditions.length && !conditions.includes(product.condition)) return false;
    if (prices.length && !matchesPrice(product, prices)) return false;
    // `style` is a slug and covers both style tags and clothing types.
    if (style && !product.tags.some((tag) => slugify(tag) === style)) return false;
    if (query) {
      const haystack = `${product.name} ${product.brand} ${product.tags.join(" ")} ${product.description || ""}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
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
