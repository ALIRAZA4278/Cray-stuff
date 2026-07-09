import Link from "next/link";
import { categoryLabels, toggleParam } from "@/lib/shop-filters";

function toggleHref(basePath, params, key, value) {
  const qs = toggleParam(params, key, value).toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function deleteHref(basePath, params, key) {
  const next = new URLSearchParams(params);
  next.delete(key);
  const qs = next.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function Chip({ href, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs text-foreground transition-colors hover:bg-accent/20"
    >
      {label}
      <span aria-hidden className="text-accent">
        &times;
      </span>
    </Link>
  );
}

// Removable chips for every active filter. Returns null when nothing is active.
export default function ActiveFilters({ basePath, params, active, q }) {
  const chips = [];
  active.categories.forEach((c) => chips.push({ key: `c-${c}`, href: toggleHref(basePath, params, "category", c), label: categoryLabels[c] || c }));
  active.sizes.forEach((s) => chips.push({ key: `s-${s}`, href: toggleHref(basePath, params, "size", s), label: `Size ${s}` }));
  active.brands.forEach((b) => chips.push({ key: `b-${b}`, href: toggleHref(basePath, params, "brand", b), label: b }));
  active.conditions.forEach((c) => chips.push({ key: `cn-${c}`, href: toggleHref(basePath, params, "condition", c), label: c }));
  if (active.maxPrice) chips.push({ key: "max", href: deleteHref(basePath, params, "max"), label: `Under €${active.maxPrice}` });
  if (q) chips.push({ key: "q", href: deleteHref(basePath, params, "q"), label: `“${q}”` });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <Chip key={c.key} href={c.href} label={c.label} />
      ))}
      <Link href={basePath} className="ml-1 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-accent">
        Clear all
      </Link>
    </div>
  );
}
