import Link from "next/link";
import NewsletterForm from "@/components/layout/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/shop/vintage", label: "Vintage" },
      { href: "/shop/y2k", label: "Y2K" },
      { href: "/shop/japanese", label: "Japanese" },
      { href: "/shop/skate", label: "Skate" },
      { href: "/shop/gorpcore", label: "Gorpcore" },
      { href: "/shop/archive", label: "Archive" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/account/orders", label: "Track Order" },
      { href: "/fire-list", label: "Fire List" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/shop?sort=new", label: "New Arrivals" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/faq", label: "Privacy Policy" },
      { href: "/faq", label: "Terms & Conditions" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="flex flex-col items-center gap-4 border-b border-border px-6 py-12 text-center">
        <h2 className="text-lg font-semibold uppercase tracking-tight">Join the Cray Stuff club</h2>
        <p className="text-sm text-muted">Be the first to know about new drops and exclusive offers.</p>
        <NewsletterForm />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-lg font-semibold uppercase tracking-tight">
            Cray<span className="text-accent"> Stuff</span>
          </p>
          <p className="mt-2 text-sm text-muted">Wear Something Different.</p>
          <div className="mt-4 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
              >
                <SocialIcon name={social.label} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-medium uppercase tracking-wide">{column.title}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 border-t border-border px-6 py-6 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">© {new Date().getFullYear()} Cray Stuff. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Visa", "Mastercard", "BLIK", "Apple Pay", "Google Pay"].map((method) => (
            <span
              key={method}
              className="rounded border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M16 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M16 3c.5 3 2.5 5 5 5.5" />
    </svg>
  );
}
