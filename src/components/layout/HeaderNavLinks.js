"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavLinks({ links, itemClassName, activeClassName, onNavigate }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className={pathname === link.href ? activeClassName : itemClassName}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
