import Link from "next/link";

export default function PlainNavLinks({ links, itemClassName }) {
  return (
    <>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={itemClassName}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
