"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// Desktop "Shop" nav item with a hover/focus dropdown of the style edits, so the
// top nav can lead with the main pages instead of a long list of styles.
export default function ShopDropdown({ itemClassName, activeClassName }) {
  const t = getDict(useLocale());
  const pathname = usePathname();
  const active = pathname === "/shop" || pathname.startsWith("/shop/");

  const shopLinks = [
    { href: "/shop", label: t.ddAllProducts },
    { href: "/shop/vintage", label: t.navVintage },
    { href: "/shop/y2k", label: t.navY2K },
    { href: "/shop/skate", label: t.navSkate },
    { href: "/shop/archive", label: t.navArchive },
    { href: "/shop/just-swag", label: t.navJustSwag },
    { href: "/sold", label: t.ddRecentlySold },
  ];

  return (
    <div className="group relative">
      <Link href="/shop" className={`${active ? activeClassName : itemClassName} inline-flex items-center gap-1`}>
        {t.ddShop}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      {/* pt-3 keeps hover alive while the cursor travels from label to panel */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="min-w-48 rounded-lg border border-border bg-background p-2 shadow-[0_18px_44px_rgba(0,0,0,0.28)]">
          {shopLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
