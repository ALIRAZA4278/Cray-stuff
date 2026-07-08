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
        className="object-cover grayscale-[50%]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[130px]"
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal delay={0}>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            Cray Stuff &mdash; One of one
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-6xl">
            We don&apos;t follow trends.
            <br />
            <span className="text-outline">Trends follow us.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-sm text-muted sm:text-base">
            Premium curated vintage &amp; streetwear &mdash; carefully selected pieces with history,
            character and style.
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
              className="rounded-full border border-border bg-background/40 px-8 py-3.5 text-sm font-medium uppercase tracking-wide backdrop-blur transition-colors hover:border-accent"
            >
              New drop
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
