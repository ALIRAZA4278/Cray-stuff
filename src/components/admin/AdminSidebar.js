"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/lib/actions/admin-auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/offers", label: "Offers" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/categories", label: "Categories" },
];

function isActive(pathname, href) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();

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
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-6 hidden space-y-1 border-t border-border pt-4 md:block">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          &larr; Back to store
        </Link>
        <form action={adminLogout}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );
}
