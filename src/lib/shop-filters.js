export const categoryLabels = { mens: "Men's", womens: "Women's", unisex: "Unisex" };

export function sortProducts(products, sort) {
  if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...products].sort((a, b) => b.price - a.price);
  if (sort === "popular") return [...products].sort((a, b) => b.fireCount - a.fireCount);
  return products;
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
