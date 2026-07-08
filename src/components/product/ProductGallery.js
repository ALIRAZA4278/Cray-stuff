"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ slug, name }) {
  const images = [1, 2, 3, 4].map((n) => `https://picsum.photos/seed/${slug}-${n}/900/1100`);
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale-[40%]"
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
            <Image src={src} alt="" fill sizes="120px" className="object-cover grayscale-[40%]" />
          </button>
        ))}
      </div>
    </div>
  );
}
