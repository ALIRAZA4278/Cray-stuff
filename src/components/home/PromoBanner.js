import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function PromoBanner() {
  return (
    <section className="relative flex h-[360px] items-center overflow-hidden border-b border-border px-6">
      <Image
        src="https://picsum.photos/seed/cray-promo-offer/1600/900"
        alt=""
        fill
        sizes="100vw"
        className="object-cover grayscale-[50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <Reveal className="relative z-10 max-w-lg">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">No bidding. No waiting.</p>
        <h2 className="mt-3 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-4xl">
          Name your price.
        </h2>
        <p className="mt-4 text-sm text-muted">
          Make an offer on any piece. Meet our price and it&apos;s an instant match — ship it today.
          Otherwise we&apos;ll counter, no auctions, no countdowns.
        </p>
        <Link
          href="/faq"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          See how it works
        </Link>
      </Reveal>
    </section>
  );
}
