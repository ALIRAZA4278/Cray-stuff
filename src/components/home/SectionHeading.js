import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";

// Consistent premium section header: eyebrow + title + optional link.
export default function SectionHeading({ eyebrow, title, link, center = false }) {
  if (center) {
    return (
      <Reveal variant="fade" className="mb-10 text-center">
        {eyebrow && <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          <RevealText text={title} />
        </h2>
      </Reveal>
    );
  }
  return (
    <Reveal variant="fade" className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          <RevealText text={title} />
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          {link.label} &rarr;
        </Link>
      )}
    </Reveal>
  );
}
