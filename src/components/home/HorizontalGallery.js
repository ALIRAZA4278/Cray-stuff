"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { styleImages } from "@/lib/style-images";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

// GSAP ScrollTrigger horizontal scroll: the section pins while a vertical scroll
// drives the track sideways — a signature effect motion doesn't do natively.
export default function HorizontalGallery() {
  const t = getDict(useLocale());
  const root = useRef(null);
  const track = useRef(null);

  const items = [
    { n: "01", label: "Vintage", href: "/shop/vintage", image: styleImages.vintage },
    { n: "02", label: "Y2K", href: "/shop/y2k", image: styleImages.y2k },
    { n: "03", label: "Skate", href: "/shop/skate", image: styleImages.skate },
    { n: "04", label: t.hmArchive, href: "/shop/archive", image: styleImages.archive },
    { n: "05", label: "Just Swag", href: "/shop/just-swag", image: styleImages["just-swag"] },
  ];

  // GSAP is loaded lazily (this section is below the fold) so it stays out of
  // the initial JS bundle and doesn't delay the page becoming visible.
  useEffect(() => {
    // Mobile gets a plain native horizontal swipe — no GSAP, no pin, no scrub.
    // The pinned/scrubbed effect fights touch scrolling (that's the lag and
    // flicker), and skipping the import keeps GSAP off the mobile bundle entirely.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !track.current || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const el = track.current;
      // Measure against the section, not the window — window.innerWidth counts
      // the scrollbar and leaves the last card short.
      const distance = () => Math.max(0, el.scrollWidth - root.current.clientWidth);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // The track keeps growing after the first measurement as images and fonts
      // land. Re-measure so the pin length isn't stuck on the old width.
      let lastWidth = el.scrollWidth;
      const observer = new ResizeObserver(() => {
        if (el.scrollWidth === lastWidth) return;
        lastWidth = el.scrollWidth;
        ScrollTrigger.refresh();
      });
      observer.observe(el);

      cleanup = () => {
        observer.disconnect();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={root} className="relative border-y border-border md:h-[100svh] md:overflow-hidden">
      <div className="pointer-events-none z-20 px-6 pt-8 sm:px-10 md:absolute md:left-10 md:top-8 md:px-0 md:pt-0">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.hmCuratedEdits}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">{t.hmShopByStyle}</h2>
      </div>

      {/* Mobile: this wrapper is the horizontal scroller (viewport-width) and the
          w-max track overflows it → native swipe. Desktop: wrapper goes visible +
          full-height and GSAP translates the track while the section is pinned. */}
      <div className="overflow-x-auto pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] md:h-full md:overflow-visible md:pb-0 md:pt-0">
        <div
          ref={track}
          className="flex w-max snap-x items-center gap-5 px-6 sm:gap-6 sm:px-10 md:h-full md:will-change-transform"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative h-[62vh] w-[82vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:w-[40vw]"
            >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 82vw, 40vw"
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
      </div>

      <p className="pointer-events-none absolute bottom-6 right-6 z-20 hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:right-10 md:block">
        {t.hmScroll} &rarr;
      </p>
    </section>
  );
}
