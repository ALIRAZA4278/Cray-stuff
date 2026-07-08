import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import FilterPill from "@/components/shop/FilterPill";
import SortSelect from "@/components/shop/SortSelect";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts, styleTags, categories } from "@/lib/mock-products";

const categoryLabels = { mens: "Men's", womens: "Women's", unisex: "Unisex" };

function sortProducts(products, sort) {
  if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...products].sort((a, b) => b.price - a.price);
  if (sort === "popular") return [...products].sort((a, b) => b.fireCount - a.fireCount);
  return products;
}

function toggleParam(params, key, value) {
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

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const activeStyles = params.style ? params.style.split(",").filter(Boolean) : [];
  const activeCategories = params.category ? params.category.split(",").filter(Boolean) : [];
  const sort = params.sort || "new";

  const filtered = mockProducts.filter((product) => {
    const matchesStyle =
      activeStyles.length === 0 || product.tags.some((tag) => activeStyles.includes(tag.toLowerCase()));
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
    return matchesStyle && matchesCategory;
  });

  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(params);
  const hasFilters = activeStyles.length > 0 || activeCategories.length > 0;

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="text-3xl font-semibold uppercase tracking-tight">Shop</h1>
          <p className="mt-2 text-sm text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"} — every one a one-of-one.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <FilterPill
                key={category}
                href={`/shop?${toggleParam(baseParams, "category", category).toString()}`}
                active={activeCategories.includes(category)}
              >
                {categoryLabels[category]}
              </FilterPill>
            ))}
            <span className="mx-1 h-4 w-px bg-border" />
            {styleTags.map((style) => (
              <FilterPill
                key={style}
                href={`/shop?${toggleParam(baseParams, "style", style.toLowerCase()).toString()}`}
                active={activeStyles.includes(style.toLowerCase())}
              >
                {style}
              </FilterPill>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4">
            {hasFilters ? (
              <Link href="/shop" className="text-sm text-accent hover:opacity-80">
                Clear filters
              </Link>
            ) : (
              <span />
            )}
            <SortSelect value={sort} />
          </div>
        </Reveal>

        {products.length === 0 ? (
          <div className="py-24 text-center text-muted">
            <p>No pieces match those filters right now.</p>
            <Link href="/shop" className="mt-3 inline-block text-sm text-accent hover:opacity-80">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
