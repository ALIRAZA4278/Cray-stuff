"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function ProductGallery({ name, images: provided = [] }) {
  const t = getDict(useLocale());
  // A product with no photos used to render FOUR random stock images from
  // picsum.photos — the same fallback that made saved Fire List pieces show up
  // as forests, except here it filled the whole product page. An honest
  // placeholder is the only correct answer.
  const images = provided.filter(Boolean);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-border bg-surface font-mono text-xs uppercase tracking-widest text-muted">
        {t.prNoPhoto}
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden rounded-md border transition-colors ${
              active === index ? "border-accent" : "border-border"
            }`}
          >
            <Image src={src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
