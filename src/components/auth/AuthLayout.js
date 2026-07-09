import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const trustPoints = [
  "One-of-one archive — never restocked",
  "Ships within 24 hours",
  "Curated by hand, not an algorithm",
];

// Editorial split layout shared by Login and Register. Left: concrete-grey
// brand panel (hidden on small screens). Right: the form.
export default function AuthLayout({ eyebrow, title, subtitle, children, alt }) {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-border bg-panel lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent-glow), transparent 70%)" }}
        />
        <Link href="/" className="relative text-lg font-semibold uppercase tracking-tight">
          Cray<span className="text-accent"> Stuff</span>
        </Link>

        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Members</p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-[0.95] tracking-tight xl:text-7xl">
            Trends follow us.
            <span className="block text-outline">You follow the drop.</span>
          </h2>
        </div>

        <ul className="relative space-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-3 text-sm text-muted">
              <span aria-hidden className="h-px w-6 bg-accent" />
              {point}
            </li>
          ))}
        </ul>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-6 py-16 sm:px-12">
        <Reveal className="w-full max-w-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}

          <div className="mt-8">{children}</div>

          {alt && (
            <p className="mt-8 border-t border-border pt-6 text-sm text-muted">
              {alt.label}{" "}
              <Link href={alt.href} className="text-accent transition-opacity hover:opacity-80">
                {alt.cta}
              </Link>
            </p>
          )}
        </Reveal>
      </main>
    </div>
  );
}
