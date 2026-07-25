"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/lib/actions/admin-auth";
import { getAdminDict } from "@/lib/admin-i18n";
import AdminLangToggle from "./AdminLangToggle";

const links = [
  { href: "/admin", key: "dashboard" },
  { href: "/admin/products", key: "products" },
  { href: "/admin/orders", key: "orders" },
  { href: "/admin/offers", key: "offers" },
  { href: "/admin/discounts", key: "discounts" },
  { href: "/admin/messages", key: "messages" },
  { href: "/admin/categories", key: "categories" },
  { href: "/admin/help", key: "guide" },
];

function isActive(pathname, href) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar({ locale = "en" }) {
  const pathname = usePathname();
  const t = getAdminDict(locale);

  return (
    <nav className="flex w-full shrink-0 flex-col border-b border-border p-4 md:h-screen md:w-60 md:border-b-0 md:border-r md:p-6">
      <div className="mb-8 hidden md:block">
        <Link href="/admin" className="text-lg font-semibold uppercase tracking-tight">
          Cray<span className="text-accent"> Stuff</span>
        </Link>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">Admin panel</p>
      </div>

      <div className="flex flex-1 flex-row gap-1 overflow-x-auto md:flex-col">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-accent/15 text-foreground"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              {t[link.key]}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 hidden space-y-3 border-t border-border pt-4 md:block">
        <div>
          <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-widest text-muted">{t.language}</p>
          <div className="px-3">
            <AdminLangToggle locale={locale} />
          </div>
        </div>
        <div className="space-y-1">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {t.backToStore}
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:text-foreground"
            >
              {t.signOut}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
