"use client";

import Image from "next/image";
import Link from "next/link";
import FireListToggle from "@/components/product/FireListToggle";
import Price from "@/components/Price";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

export default function ProductCard({ product }) {
  const t = getDict(useLocale());
  const imgs = product.images && product.images.length ? product.images : null;
  const primaryImg = imgs ? imgs[0] : `https://picsum.photos/seed/${product.slug}/600/800`;
  const hoverImg = imgs ? imgs[1] || imgs[0] : `https://picsum.photos/seed/${product.slug}-2/600/800`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden rounded-md border border-border bg-surface">
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 60vw, 300px"
          className={`object-cover transition-opacity duration-500 group-hover:opacity-0 ${
            "grayscale-[40%]"
          }`}
        />
        <Image
          src={hoverImg}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, 300px"
          className={`object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            "grayscale-[40%]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20" />
        {product.sold && (
          <span className="absolute left-3 top-3 z-10 rounded-sm border border-white/40 bg-background/50 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur">
            {t.prSoldOut}
          </span>
        )}
        <div className="absolute bottom-3 left-3 rounded-sm border border-border bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground backdrop-blur">
          {t.prFitBadge.replace("{size}", product.size)}
        </div>
        <FireListToggle product={product} />
      </div>
      {/* flex-1 + mt-auto on the tags pins them to the bottom, so every card in
          a row lines up regardless of how long the name runs. */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="inline-block max-w-full truncate rounded-full bg-accent px-2.5 py-0.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
              {product.brand}
            </span>
            <p className="mt-0.5 line-clamp-2 text-base font-medium">{product.name}</p>
          </div>
          <p className="shrink-0 whitespace-nowrap font-mono text-sm font-medium sm:text-base">
            <Price amount={product.price} currency={product.currency} />
          </p>
        </div>
        <p className="mt-0.5 truncate font-mono text-[11px] uppercase tracking-wide text-muted">
          {product.size} &middot; {product.condition}
        </p>
        {/* Capped and wrapping — an uncapped single-line row spilled outside the
            card on narrow screens. */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="max-w-full truncate rounded border border-border px-1.5 py-0.5 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
