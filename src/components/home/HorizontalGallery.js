"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { styleImages } from "@/lib/style-images";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  { n: "01", label: "Vintage", href: "/shop/vintage", image: styleImages.vintage },
  { n: "02", label: "Y2K", href: "/shop/y2k", image: styleImages.y2k },
  { n: "03", label: "Skate", href: "/shop/skate", image: styleImages.skate },
  { n: "04", label: "Archive", href: "/shop/archive", image: styleImages.archive },
  { n: "05", label: "Just Swag", href: "/shop/just-swag", image: styleImages["just-swag"] },
];

// GSAP ScrollTrigger horizontal scroll: the section pins while a vertical scroll
// drives the track sideways — a signature effect motion doesn't do natively.
export default function HorizontalGallery() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const el = track.current;
      // Measure against the section, not the window — window.innerWidth counts
      // the scrollbar and leaves the last card short.
      const distance = () => Math.max(0, el.scrollWidth - root.current.clientWidth);
      gsap.to(el, {
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
      // land. Without re-measuring, the pin length stays stuck on the old width
      // and the run stops before the last card is fully in view.
      let lastWidth = el.scrollWidth;
      const observer = new ResizeObserver(() => {
        if (el.scrollWidth === lastWidth) return;
        lastWidth = el.scrollWidth;
        ScrollTrigger.refresh();
      });
      observer.observe(el);
      return () => observer.disconnect();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden border-y border-border">
      <div className="pointer-events-none absolute left-6 top-8 z-20 sm:left-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Curated edits</p>
        <h2 className="mt-1 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">Shop by style</h2>
      </div>

      <div ref={track} className="flex h-full w-max items-center gap-5 px-6 will-change-transform sm:gap-6 sm:px-10">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative h-[64vh] w-[82vw] shrink-0 overflow-hidden rounded-2xl border border-border sm:w-[40vw]"
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
                Shop &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-6 right-6 z-20 font-mono text-[11px] uppercase tracking-widest text-muted sm:right-10">
        Scroll &rarr;
      </p>
    </section>
  );
}
