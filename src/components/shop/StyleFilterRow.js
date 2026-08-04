import FilterPill from "@/components/shop/FilterPill";
import { styleTags } from "@/lib/mock-products";
import { categoryLabel } from "@/lib/category-label";

export default function StyleFilterRow({ currentStyle }) {
  return (
    <>
      <FilterPill href="/shop" active={!currentStyle}>
        All
      </FilterPill>
      {styleTags.map((style) => {
        const slug = style.toLowerCase();
        return (
          <FilterPill key={style} href={`/shop/${slug}`} active={currentStyle === slug}>
            {categoryLabel(style)}
          </FilterPill>
        );
      })}
    </>
  );
}
