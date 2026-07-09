import Image from "next/image";
import Link from "next/link";
import FireListToggle from "@/components/product/FireListToggle";

export default function ProductCard({ product }) {
  const imgs = product.images && product.images.length ? product.images : null;
  const primaryImg = imgs ? imgs[0] : `https://picsum.photos/seed/${product.slug}/600/800`;
  const hoverImg = imgs ? imgs[1] || imgs[0] : `https://picsum.photos/seed/${product.slug}-2/600/800`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-lg border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-surface">
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 60vw, 300px"
          className={`object-cover transition-opacity duration-500 group-hover:opacity-0 ${
            product.sold ? "grayscale" : "grayscale-[40%]"
          }`}
        />
        <Image
          src={hoverImg}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, 300px"
          className={`object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            product.sold ? "grayscale" : "grayscale-[40%]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20" />
        {product.sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <span className="rounded-sm border border-border bg-background/90 px-3 py-1 font-mono text-xs uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex origin-top-left items-center gap-1 rounded-sm border border-border bg-background/80 px-2 py-1 font-mono text-[10px] text-muted backdrop-blur transition-transform duration-300 group-hover:-rotate-3">
          <span className="h-1.5 w-1.5 rounded-full border border-muted" />
          N&deg; {String(product.id).padStart(3, "0")}/1
        </div>
        <div className="absolute bottom-3 left-3 rounded-sm border border-border bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground backdrop-blur">
          Size {product.size}
        </div>
        <FireListToggle product={product} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{product.brand}</p>
          <p className="mt-0.5 text-base font-medium">{product.name}</p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted">
            {product.size} &middot; {product.condition}
          </p>
          <div className="mt-1.5 flex gap-1.5">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded border border-border px-1.5 py-0.5 text-[11px] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="shrink-0 whitespace-nowrap font-mono text-sm font-medium sm:text-base">&euro;{product.price}</p>
      </div>
    </Link>
  );
}
