"use client";

import Image from "next/image";
import Link from "next/link";
import FireListToggle from "@/components/product/FireListToggle";
import Price from "@/components/Price";
import { useLocale } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";
import { categoryLabel } from "@/lib/category-label";

export default function ProductCard({ product }) {
  const t = getDict(useLocale());
  const imgs = product.images && product.images.length ? product.images : null;
  const primaryImg = imgs ? imgs[0] : `https://picsum.photos/seed/${product.slug}/600/800`;
  const hoverImg = imgs ? imgs[1] || imgs[0] : `https://picsum.photos/seed/${product.slug}-2/600/800`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-2.5 transition-all sm:p-3 duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden rounded-md border border-border bg-surface">
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1536px) 33vw, 300px"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={hoverImg}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1536px) 33vw, 300px"
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Was a full-tile wash (from-black/70 ... to-black/20) that dimmed every
            photo. Now a short bottom-only scrim: the FIT badge stays readable and
            the garment itself renders at its true brightness. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent" />
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
            {/* translate="no" — Chrome's auto-translate was mangling titles:
                "Crazy Heavy Distress Skate Pants" came out as "crazy, heavy,
                distressed, skate trousers". Brand names, product titles and style
                tags are naming terms, not prose, so they stay in English. */}
            <span
              translate="no"
              className="notranslate inline-block max-w-full truncate rounded-full bg-accent px-2.5 py-0.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-wide text-white"
            >
              {product.brand}
            </span>
            <p translate="no" className="notranslate mt-0.5 line-clamp-2 text-base font-medium">
              {product.name}
            </p>
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
              translate="no"
              className="notranslate max-w-full truncate rounded border border-border px-1.5 py-0.5 text-[11px] text-muted"
            >
              {categoryLabel(tag)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
