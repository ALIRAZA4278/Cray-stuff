import FilterPill from "@/components/shop/FilterPill";
import { categories } from "@/lib/mock-products";
import { categoryLabels, toggleParam } from "@/lib/shop-filters";

export default function CategoryFilterRow({ basePath, activeCategories, params }) {
  return (
    <>
      {categories.map((category) => (
        <FilterPill
          key={category}
          href={`${basePath}?${toggleParam(params, "category", category).toString()}`}
          active={activeCategories.includes(category)}
        >
          {categoryLabels[category]}
        </FilterPill>
      ))}
    </>
  );
}
