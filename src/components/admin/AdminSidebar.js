import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/offers", label: "Offers" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/categories", label: "Categories" },
];

export default function AdminSidebar() {
  return (
    <nav className="w-56 shrink-0 space-y-2 border-r border-white/10 p-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block text-sm text-zinc-300 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
