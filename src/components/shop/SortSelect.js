"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function SortSelect({ value }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = [
    { value: "new", label: t.shSortNewest },
    { value: "price-asc", label: t.shSortPriceAsc },
    { value: "price-desc", label: t.shSortPriceDesc },
    { value: "popular", label: t.shSortPopular },
  ];

  function handleChange(event) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", event.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-full border border-border bg-transparent px-4 py-2 text-sm outline-none focus:border-accent"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-background">
          {option.label}
        </option>
      ))}
    </select>
  );
}
