"use client";

import { useEffect, useRef, useState } from "react";
import UnveilReveal from "@/components/motion/UnveilReveal";
import ProductCard from "@/components/product/ProductCard";

export default function ProductCarousel({ products }) {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  function updateProgress() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  useEffect(() => {
    updateProgress();
  }, []);

  function scrollByAmount(direction) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={updateProgress}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <UnveilReveal
            key={product.id}
            delay={index * 0.04}
            className="w-65 shrink-0 snap-start rounded-lg sm:w-75"
          >
            <ProductCard product={product} />
          </UnveilReveal>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-0.5 flex-1 rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}
