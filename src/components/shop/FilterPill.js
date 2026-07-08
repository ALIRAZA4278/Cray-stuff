import Link from "next/link";

export default function FilterPill({ href, active, children }) {
  return (
    <Link
      href={href}
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
