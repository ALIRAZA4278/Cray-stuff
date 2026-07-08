import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-24 sm:py-32">
      <Image
        src="https://picsum.photos/seed/cray-hero/1920/1080"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale-[50%]"
      />
      <div aria-hidden className="absolute inset-0 bg-background/80" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal delay={0}>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">N&deg; 001 &mdash; One of one.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
            We don&apos;t follow trends.
            <br />
            Trends follow us.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-muted">
            Premium curated vintage &amp; streetwear. Carefully selected pieces with history,
            character and style.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-white/30"
            >
              New Drop
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
