import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function PromoBanner() {
  return (
    <section className="relative flex h-[380px] items-center overflow-hidden border-b border-border px-6 sm:h-[460px]">
      <Image
        src="https://picsum.photos/seed/cray-promo-offer/1600/900"
        alt=""
        fill
        sizes="100vw"
        className="object-cover grayscale-[25%]"
      />
      {/* Dark editorial wash — rich and legible in both themes. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-lg">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">No bidding. No waiting.</p>
          <h2 className="mt-3 text-4xl font-semibold uppercase leading-none tracking-tight text-white drop-shadow-sm sm:text-6xl">
            Name your price.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Make an offer on any piece. Meet our price and it&apos;s an instant match — shipped today. Otherwise we&apos;ll
            counter automatically. No auctions, no countdowns.
          </p>
          <Link
            href="/faq"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            See how it works &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
