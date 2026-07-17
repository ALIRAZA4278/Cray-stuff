import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ValueProps from "@/components/home/ValueProps";

export const metadata = {
  title: "About — CRAY STUFF",
  description:
    "CRAY STUFF is a curated store for handpicked vintage, Y2K, skatewear and archive pieces. Wear Something Different.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex h-[420px] items-center overflow-hidden border-b border-border px-6 sm:h-[520px]">
        <Image
          src="/PRODOCT/ABOUT/founder-street-jeans.jpg"
          alt="Wiktor, founder of CRAY STUFF"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top grayscale-[30%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <Reveal className="relative mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Our story</p>
          <h1 className="mt-4 text-5xl uppercase leading-none tracking-tight text-white sm:text-7xl">
            Wear Something
            <br />
            <span className="text-outline" style={{ WebkitTextStrokeColor: "#ffffff" }}>
              Different.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/75">
            A curated home for handpicked vintage, Y2K, skatewear, Japanese archive and selected high-end pieces — for
            people who appreciate individuality, originality and clothing with character.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Origins */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Origins</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">It started with a passion</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Everything started at the end of 2021. At first, it was simply a passion for clothing and a way to fund
              the next addition to my own wardrobe. What started with a few sold pieces quickly grew into something much
              bigger.
            </p>
            <p>
              Vintage, old football shirts, baggy jeans, skate brands, Y2K pieces and clothing you simply couldn&apos;t
              find in regular stores started passing through my hands almost every single day. Over time I realised it
              was no longer just about buying and selling clothes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <blockquote className="my-12 border-l-2 border-accent pl-6 text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
            It became a passion — for finding pieces with character, history and personality.
          </blockquote>
        </Reveal>

        {/* The name */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">The name</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">CRAY / STUFF</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-4xl uppercase tracking-tight text-accent">CRAY</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Reflects who I am — someone who likes doing things his own way.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-4xl uppercase tracking-tight">STUFF</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Represents the carefully selected pieces that end up here.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            The energy behind this project is reflected both in me and in the clothes you&apos;ll find here.
          </p>
        </Reveal>
      </div>

      {/* Wear what you love — full-bleed image band */}
      <section className="relative flex min-h-[360px] items-center overflow-hidden border-y border-border px-6 py-16">
        <Image
          src="/PRODOCT/ABOUT/founder-stairs.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center grayscale-[35%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <Reveal className="relative mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Wear what you love</p>
          <h2 className="mt-3 text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl">
            Not to follow trends — but to find pieces that feel like your own.
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/75">
            <p>
              Fashion today often feels repetitive. The same cuts, the same trends, the same outfits everywhere. CRAY
              STUFF was created for people looking for something different.
            </p>
            <p>
              Sometimes it&apos;s a well-known brand. Sometimes it&apos;s a complete no-name piece nobody else owns.
              Because the best clothes aren&apos;t always the most expensive ones — sometimes they&apos;re simply the ones
              that leave the biggest impression.
            </p>
          </div>
        </Reveal>
      </section>

      <ValueProps />

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Selected by hand */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Every piece, by hand</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">Character over perfection</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Every product is selected by hand. If an item has flaws, you&apos;ll see them in the photos and read about
              them in the description. A small flaw doesn&apos;t stop a great piece from being a great piece.
            </p>
            <p>
              A tiny stain, signs of wear or natural aging often add character rather than take it away. Many of these
              pieces have already been overlooked by someone else despite still having plenty of life left in them.
              That&apos;s exactly why they end up here.
            </p>
          </div>
        </Reveal>

        {/* One-person project */}
        <Reveal delay={0.05}>
          <blockquote className="my-12 border-l-2 border-accent pl-6 text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
            Almost everything passes through my hands — sourcing, photography, packaging, shipping.
          </blockquote>
        </Reveal>

        <Reveal>
          <p className="text-sm leading-relaxed text-muted">
            CRAY STUFF is still largely a one-person project. Every piece you see here is the result of countless hours
            spent searching for clothing that deserves a second life. Not because it&apos;s expensive. Not because
            it&apos;s trendy. Simply because it&apos;s amazing.
          </p>
        </Reveal>

        {/* Founder gallery — Wiktor in his world */}
        <Reveal delay={0.05}>
          <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3">
            {["founder-moon", "founder-group-usa", "founder-elevator"].map((name) => (
              <div
                key={name}
                className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={`/PRODOCT/ABOUT/${name}.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 220px"
                  className="object-cover grayscale-[30%] transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Authenticity callout */}
        <Reveal delay={0.05}>
          <div className="mt-12 rounded-lg border border-border bg-surface p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">100% authenticity guarantee</p>
            <h3 className="mt-3 text-2xl uppercase tracking-tight">Checked by hand, guaranteed</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Every product is checked manually before it&apos;s listed. If authenticity concerns are ever confirmed,
              you get a full refund — no questions asked.
            </p>
          </div>
        </Reveal>

        {/* Welcome + signature */}
        <Reveal>
          <div className="mt-16 border-t border-border pt-10 text-center">
            <p className="text-sm leading-relaxed text-muted">
              From the beginning, the goal was never to build just another clothing store. The goal was to create a
              place for people with the same passion — where you can discover something unique. If you&apos;re one of
              those people —
            </p>
            <p className="mt-6 text-4xl uppercase tracking-tight">Welcome.</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">Wiktor &ldquo;CRAY&rdquo;</p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Founder of CRAY STUFF</p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
            >
              Explore the drop &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
