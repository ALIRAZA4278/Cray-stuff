import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import StyleFilterRow from "@/components/shop/StyleFilterRow";
import CategoryFilterRow from "@/components/shop/CategoryFilterRow";
import SortSelect from "@/components/shop/SortSelect";
import ShopResults from "@/components/shop/ShopResults";
import { mockProducts, styleTags } from "@/lib/mock-products";
import { sortProducts } from "@/lib/shop-filters";
import { styleCopy } from "@/lib/style-copy";

export function generateStaticParams() {
  return styleTags.map((style) => ({ style: style.toLowerCase() }));
}

export default async function StyleShopPage({ params, searchParams }) {
  const { style } = await params;
  const styleLabel = styleTags.find((tag) => tag.toLowerCase() === style);

  if (!styleLabel) {
    notFound();
  }

  const search = await searchParams;
  const activeCategories = search.category ? search.category.split(",").filter(Boolean) : [];
  const sort = search.sort || "new";

  const filtered = mockProducts.filter((product) => {
    const matchesStyle = product.tags.some((tag) => tag.toLowerCase() === style);
    const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
    return matchesStyle && matchesCategory;
  });
  const products = sortProducts(filtered, sort);
  const baseParams = new URLSearchParams(search);
  const basePath = `/shop/${style}`;

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-8">
          <h1 className="text-3xl font-semibold uppercase tracking-tight">{styleLabel}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">{styleCopy[style]}</p>
          <p className="mt-2 text-sm text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"} — every one a one-of-one.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="flex flex-col gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryFilterRow basePath={basePath} activeCategories={activeCategories} params={baseParams} />
            <span className="mx-1 h-4 w-px bg-border" />
            <StyleFilterRow currentStyle={style} />
          </div>
          <div className="flex items-center justify-between gap-4">
            {activeCategories.length > 0 ? (
              <Link href={basePath} className="text-sm text-accent hover:opacity-80">
                Clear filters
              </Link>
            ) : (
              <span />
            )}
            <SortSelect value={sort} />
          </div>
        </Reveal>

        <ShopResults products={products} clearHref={basePath} />
      </div>
    </div>
  );
}
