"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function HeaderNavLinks({ links, itemClassName, activeClassName, onNavigate }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStyle = searchParams.get("style");

  function isActive(href) {
    const [linkPath, linkQuery] = href.split("?");
    if (linkPath !== pathname) return false;
    if (!linkQuery) return pathname === "/shop" && !activeStyle;
    const linkStyle = new URLSearchParams(linkQuery).get("style");
    return linkStyle === activeStyle;
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className={isActive(link.href) ? activeClassName : itemClassName}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
