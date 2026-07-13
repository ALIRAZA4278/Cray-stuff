import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden border-b border-border px-6 text-center sm:h-[640px]">
      <Image
        src="https://picsum.photos/seed/cray-hero/1920/1080"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale-[30%]"
      />
      {/* Dark editorial wash — rich hero image with legible white type in both themes. */}
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
      {/* Focused vignette so the headline reads against a busy photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[130px]"
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal delay={0}>
          <p className="font-mono text-sm font-semibold uppercase tracking-widest text-violet-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
            Cray Stuff &mdash; One of one
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            We don&apos;t follow trends.
            <br />
            <span
              className="text-outline filter-[drop-shadow(0_2px_12px_rgba(0,0,0,0.65))]"
              style={{ WebkitTextStrokeColor: "#ffffff", WebkitTextStrokeWidth: "2px" }}
            >
              Trends follow us.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">
            Premium curated vintage &amp; streetwear &mdash; carefully selected pieces with history, character and style.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
            >
              Shop now &rarr;
            </Link>
            <Link
              href="/shop?sort=new"
              className="rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              New drop
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between border-t border-white/10 bg-black/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/60 backdrop-blur sm:flex">
        <span>Warsaw &rarr; Worldwide</span>
        <span>One-of-one archive</span>
        <span>Ships in 24h</span>
      </div>
    </section>
  );
}
