import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
      <path d="M12 2l7 7-7 13-7-13 7-7z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
      <path d="M3 16.5l6-6 4 4 7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandPill({ brand, fire }) {
  return (
    <Link
      href={`/shop?brand=${encodeURIComponent(brand)}`}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        fire
          ? "border-accent bg-accent/10 text-foreground shadow-[0_0_18px_var(--accent-glow)] hover:bg-accent/20"
          : "border-border text-muted hover:border-accent hover:text-foreground"
      }`}
    >
      {brand}
    </Link>
  );
}

function Rail({ label, brands, fire = false, icon = null, delay = 0 }) {
  if (!brands.length) return null;
  return (
    <Reveal delay={delay}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {icon}
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/40 via-border to-transparent" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {brands.map((brand) => (
          <BrandPill key={brand} brand={brand} fire={fire} />
        ))}
      </div>
    </Reveal>
  );
}

// Brand discovery rails. "On fire" is computed automatically from the most
// saved pieces, so trending labels surface without manual work. Pass `bare`
// to drop it inside an existing container (e.g. the shop page) without the
// full-width section chrome.
export default function BrandDiscovery({ groups, bare = false }) {
  const { fire = [], hot = [], designer = [] } = groups || {};
  if (!fire.length && !hot.length && !designer.length) return null;

  const inner = (
    <>
      <SectionHeading eyebrow="The labels" title="Shop by brand" link={bare ? null : { href: "/shop", label: "All pieces" }} />
      <div className="space-y-8">
        <Rail label="Designer" brands={designer} icon={<DiamondIcon />} delay={0} />
        <Rail label="Hot right now" brands={hot} icon={<TrendIcon />} delay={0.05} />
        <Rail label="On fire" brands={fire} fire icon={<FlameIcon />} delay={0.1} />
      </div>
    </>
  );

  if (bare) return <div>{inner}</div>;

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <div className="relative mx-auto max-w-7xl">{inner}</div>
    </section>
  );
}
