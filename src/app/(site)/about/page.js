import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import ValueProps from "@/components/home/ValueProps";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "About — CRAY STUFF",
  description:
    "CRAY STUFF is a curated store for handpicked vintage, Y2K, skatewear and archive pieces. Wear Something Different.",
};

export default async function AboutPage() {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");
  return (
    <div>
      {/* Hero — split so the full portrait shows without cropping */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <Reveal className="order-2 lg:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutStoryEyebrow}</p>
            <h1 className="mt-4 text-5xl uppercase leading-none tracking-tight sm:text-7xl">
              {t.pgAboutHeroLine1}
              <br />
              <span className="text-outline">{t.pgAboutHeroLine2}</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {t.pgAboutHeroIntro}
            </p>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-border">
              <Image
                src="/PRODOCT/ABOUT/founder-street-jeans.jpg"
                alt={t.pgAboutFounderAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 400px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Origins */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutOriginsEyebrow}</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">{t.pgAboutOriginsTitle}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <p>{t.pgAboutOriginsP1}</p>
            <p>{t.pgAboutOriginsP2}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <blockquote className="my-12 border-l-2 border-accent pl-6 text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
            {t.pgAboutQuote1}
          </blockquote>
        </Reveal>

        {/* The name */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutNameEyebrow}</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">{t.pgAboutNameTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-4xl uppercase tracking-tight text-accent">CRAY</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.pgAboutCrayDesc}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <p className="text-4xl uppercase tracking-tight">STUFF</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.pgAboutStuffDesc}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            {t.pgAboutNameOutro}
          </p>
        </Reveal>
      </div>

      {/* Wear what you love — split so the founder portrait shows in full */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-16 lg:grid-cols-[1fr_360px] lg:gap-12">
        <Reveal className="w-full">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutWearEyebrow}</p>
          <h2 className="mt-3 text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
            {t.pgAboutWearTitle}
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
            <p>{t.pgAboutWearP1}</p>
            <p>{t.pgAboutWearP2}</p>
          </div>
        </Reveal>

        <Reveal className="w-full">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-border lg:max-w-none">
            <Image
              src="/PRODOCT/ABOUT/founder-stairs.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 80vw, 360px"
              className="object-cover"
            />
          </div>
        </Reveal>
        </div>
      </section>

      <ValueProps />

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Selected by hand */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutHandEyebrow}</p>
          <h2 className="mt-3 text-3xl uppercase tracking-tight">{t.pgAboutHandTitle}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
            <p>{t.pgAboutHandP1}</p>
            <p>{t.pgAboutHandP2}</p>
          </div>
        </Reveal>

        {/* One-person project */}
        <Reveal delay={0.05}>
          <blockquote className="my-12 border-l-2 border-accent pl-6 text-2xl uppercase leading-tight tracking-tight sm:text-3xl">
            {t.pgAboutQuote2}
          </blockquote>
        </Reveal>

        <Reveal>
          <p className="text-sm leading-relaxed text-muted">
            {t.pgAboutOnePerson}
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
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAboutAuthEyebrow}</p>
            <h3 className="mt-3 text-2xl uppercase tracking-tight">{t.pgAboutAuthTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.pgAboutAuthDesc}
            </p>
          </div>
        </Reveal>

        {/* Welcome + signature */}
        <Reveal>
          <div className="mt-16 border-t border-border pt-10 text-center">
            <p className="text-sm leading-relaxed text-muted">
              {t.pgAboutClosing}
            </p>
            <p className="mt-6 text-4xl uppercase tracking-tight">{t.pgAboutWelcome}</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">Wiktor &ldquo;CRAY&rdquo;</p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{t.pgAboutFounderOf}</p>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.pgAboutExplore}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
