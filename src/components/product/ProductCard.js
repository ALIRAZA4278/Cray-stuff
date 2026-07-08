import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-lg border border-border bg-white/[0.03] p-4 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-border bg-white/[0.03]">
        <Image
          src={`https://picsum.photos/seed/${product.slug}/600/800`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 60vw, 300px"
          className="object-cover grayscale-[40%] transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20" />
        <div className="absolute left-3 top-3 flex origin-top-left items-center gap-1 rounded-sm border border-border bg-background/80 px-2 py-1 font-mono text-[10px] text-muted backdrop-blur transition-transform duration-300 group-hover:-rotate-3">
          <span className="h-1.5 w-1.5 rounded-full border border-muted" />
          N&deg; {String(product.id).padStart(3, "0")}/1
        </div>
        <button
          type="button"
          aria-label="Add to Fire List"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur transition-colors group-hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
            <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4.5 5.9 4c2-.3 3.9.7 4.9 2.3C11.9 4.7 13.8 3.7 15.8 4c3.6.5 5.5 4.1 3.9 7.7C21.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{product.brand}</p>
          <p className="mt-0.5 text-base font-medium">{product.name}</p>
          <div className="mt-1.5 flex gap-1.5">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded border border-border px-1.5 py-0.5 text-[11px] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="whitespace-nowrap font-mono text-base font-medium">&euro;{product.price}</p>
      </div>
    </Link>
  );
}
