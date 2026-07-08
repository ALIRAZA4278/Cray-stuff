"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function SortSelect({ value }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
