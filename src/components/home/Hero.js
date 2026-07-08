import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const panels = ["cray-hero-1", "cray-hero-2", "cray-hero-3"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid h-[380px] grid-cols-3 sm:h-[600px]">
        {panels.map((seed) => (
          <div key={seed} className="relative">
            <Image
              src={`https://picsum.photos/seed/${seed}/900/1200`}
              alt=""
              fill
              priority
              sizes="34vw"
              className="object-cover grayscale-[50%]"
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]"
      />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:pb-16">
        <div className="mx-auto max-w-3xl">
          <Reveal delay={0}>
            <p className="font-mono text-sm uppercase tracking-widest text-accent">N&deg; 001 &mdash; One of one.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-3 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              We don&apos;t follow trends.
              <br />
              Trends follow us.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-md text-sm text-muted sm:text-base">
              Premium curated vintage &amp; streetwear. Carefully selected pieces with history,
              character and style.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Shop Now
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent"
              >
                New Drop
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
