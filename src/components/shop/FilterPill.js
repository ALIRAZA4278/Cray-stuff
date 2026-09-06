import Link from "next/link";

export default function FilterPill({ href, active, children }) {
  return (
    <Link
      href={href}
      // scroll={false} keeps the viewport where it is. Without it every filter
      // click jumped back to the top of the page — the single most annoying
      // thing about filtering on mobile.
      scroll={false}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-accent bg-accent/10 text-foreground"
          : "border-border text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
