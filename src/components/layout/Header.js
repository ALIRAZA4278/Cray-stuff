"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import HeaderNavLinks from "./HeaderNavLinks";
import PlainNavLinks from "./PlainNavLinks";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?style=vintage", label: "Vintage" },
  { href: "/shop?style=y2k", label: "Y2K" },
  { href: "/shop?style=japanese", label: "Japanese" },
  { href: "/shop?style=skate", label: "Skate" },
  { href: "/shop?style=gorpcore", label: "Gorpcore" },
  { href: "/shop?style=archive", label: "Archive" },
];

const desktopItemClass = "text-muted transition-colors hover:text-foreground";
const desktopActiveClass = "text-accent";
const mobileItemClass = "py-2 text-sm text-muted transition-colors hover:text-foreground";
const mobileActiveClass = "py-2 text-sm text-accent";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="border-b border-border px-6 py-2 text-center text-xs uppercase tracking-wide text-muted">
        Free shipping on orders over 250 PLN
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold uppercase tracking-tight">
          Cray<span className="text-accent"> Stuff</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Suspense fallback={<PlainNavLinks links={navLinks} itemClassName={desktopItemClass} />}>
            <HeaderNavLinks links={navLinks} itemClassName={desktopItemClass} activeClassName={desktopActiveClass} />
          </Suspense>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1 font-mono text-xs text-muted sm:flex">
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={lang === "EN" ? "text-foreground" : "transition-colors hover:text-foreground"}
            >
              EN
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLang("PL")}
              className={lang === "PL" ? "text-foreground" : "transition-colors hover:text-foreground"}
            >
              PL
            </button>
          </div>
          <Link href="/fire-list" aria-label="Fire List" className="text-muted transition-colors hover:text-foreground">
            <HeartIcon />
          </Link>
          <Link href="/cart" aria-label="Cart" className="text-muted transition-colors hover:text-foreground">
            <BagIcon />
          </Link>
          <Link
            href="/login"
            aria-label="Account"
            className="hidden text-muted transition-colors hover:text-foreground sm:block"
          >
            <UserIcon />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
            className="text-muted transition-colors hover:text-foreground md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          <Suspense fallback={<PlainNavLinks links={navLinks} itemClassName={mobileItemClass} />}>
            <HeaderNavLinks
              links={navLinks}
              itemClassName={mobileItemClass}
              activeClassName={mobileActiveClass}
              onNavigate={() => setOpen(false)}
            />
          </Suspense>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
