export const categoryLabels = { mens: "Men's", womens: "Women's", unisex: "Unisex" };

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
    conditions: uniq(products.map((p) => p.condition)),
  };
}

// Applies every active filter (category, size, brand, condition, price, style, search).
export function filterProducts(products, filters = {}) {
  const { categories = [], sizes = [], brands = [], conditions = [], maxPrice = null, style = null, q = null } = filters;
  const query = q ? q.trim().toLowerCase() : null;

  return products.filter((product) => {
    if (categories.length && !categories.includes(product.category)) return false;
    if (sizes.length && !sizes.includes(product.size)) return false;
    if (brands.length && !brands.includes(product.brand)) return false;
    if (conditions.length && !conditions.includes(product.condition)) return false;
    if (maxPrice && product.price > maxPrice) return false;
    if (style && !product.tags.some((tag) => tag.toLowerCase() === style)) return false;
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
