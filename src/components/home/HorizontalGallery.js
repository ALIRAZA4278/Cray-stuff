"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { styleImages } from "@/lib/style-images";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// A plain horizontal scroll strip — swipe on touch, arrow buttons on desktop.
// No GSAP pin/scrub: pinning trapped the page scroll and janked on mobile, for
// an effect that isn't worth the cost. The page always scrolls normally now.
export default function HorizontalGallery() {
  const t = getDict(useLocale());
  const scroller = useRef(null);

  const items = [
    { n: "01", label: "Vintage", href: "/shop/vintage", image: styleImages.vintage },
    { n: "02", label: "Y2K", href: "/shop/y2k", image: styleImages.y2k },
    { n: "03", label: "Skate", href: "/shop/skate", image: styleImages.skate },
    { n: "04", label: t.hmArchive, href: "/shop/archive", image: styleImages.archive },
    { n: "05", label: "Just Swag", href: "/shop/just-swag", image: styleImages["just-swag"] },
  ];

  function scrollBy(dir) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="relative border-y border-border py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between px-6 sm:px-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.hmCuratedEdits}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">{t.hmShopByStyle}</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label={t.hmScrollLeft}
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label={t.hmScrollRight}
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 sm:px-10"
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:aspect-[4/5] sm:w-[38vw] lg:w-[28vw]"
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 28vw"
              className="object-cover grayscale-[25%] transition-transform duration-700 group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/60">N° {item.n}</p>
                <p className="mt-1 font-display text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                  {item.label}
                </p>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t.hmShop} &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
