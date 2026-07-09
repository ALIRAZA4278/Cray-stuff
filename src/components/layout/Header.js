"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import AnnouncementBar from "./AnnouncementBar";
import HeaderNavLinks from "./HeaderNavLinks";
import ThemeToggle from "./ThemeToggle";
import HeaderSearch from "./HeaderSearch";
import { useCart } from "@/lib/CartContext";
import { useFireList } from "@/lib/FireListContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop/vintage", label: "Vintage" },
  { href: "/shop/y2k", label: "Y2K" },
  { href: "/shop/japanese", label: "Japanese" },
  { href: "/shop/skate", label: "Skate" },
  { href: "/shop/gorpcore", label: "Gorpcore" },
  { href: "/shop/archive", label: "Archive" },
];

const desktopItemClass =
  "nav-underline text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground";
const desktopActiveClass = "nav-underline text-xs uppercase tracking-widest text-accent";
const mobileItemClass = "py-2 text-sm text-muted transition-colors hover:text-foreground";
const mobileActiveClass = "py-2 text-sm text-accent";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const { items } = useCart();
  const { count: fireCount } = useFireList();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <AnnouncementBar />

      <div className="relative flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <HeaderSearch />
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
          <ThemeToggle />
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold uppercase tracking-tight"
        >
          Cray<span className="text-accent"> Stuff</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/fire-list"
            aria-label="Fire List"
            className={`relative transition-colors hover:text-foreground ${
              fireCount > 0 ? "text-accent" : "text-muted"
            }`}
          >
            <HeartIcon filled={fireCount > 0} />
            {fireCount > 0 && (
              <motion.span
                key={fireCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[10px] text-accent-foreground shadow-[0_0_10px_var(--accent-glow)]"
              >
                {fireCount}
              </motion.span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-muted transition-colors hover:text-foreground"
          >
            <BagIcon />
            {items.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[10px] text-accent-foreground">
                {items.length}
              </span>
            )}
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

      <nav className="hidden items-center justify-center gap-8 border-t border-border bg-panel py-3 md:flex">
        <HeaderNavLinks links={navLinks} itemClassName={desktopItemClass} activeClassName={desktopActiveClass} />
      </nav>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          <HeaderNavLinks
            links={navLinks}
            itemClassName={mobileItemClass}
            activeClassName={mobileActiveClass}
            onNavigate={() => setOpen(false)}
          />
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

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
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
