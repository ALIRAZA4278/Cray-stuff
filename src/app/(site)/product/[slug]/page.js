import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGallery from "@/components/product/ProductGallery";
import CartActions from "@/components/product/CartActions";
import MakeOfferDialog from "@/components/product/MakeOfferDialog";
import FireListButton from "@/components/product/FireListButton";
import ProductQA from "@/components/product/ProductQA";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/motion/Reveal";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { pieceNumber } from "@/lib/piece-number";
import { slugify } from "@/lib/shop-filters";
import { getQuestionsForProduct } from "@/lib/qa";

const assurances = [
  { icon: TruckIcon, title: "Ships in 24h", note: "InPost · Orlen · GLS · DPD" },
  { icon: GemIcon, title: "One of one", note: "Never restocked" },
  { icon: CheckIcon, title: "Hand-checked", note: "Sourced & graded by us" },
  { icon: LockIcon, title: "Secure checkout", note: "BLIK · Card · Apple/Google Pay" },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found — CRAY STUFF" };
  return {
    title: `${product.name} — ${product.brand} — CRAY STUFF`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [questions, all] = await Promise.all([
    getQuestionsForProduct(product.slug),
    getAllProducts(),
  ]);

  const related = all
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => (a.category === product.category ? -1 : 1) - (b.category === product.category ? -1 : 1))
    .slice(0, 4);

  const number = pieceNumber(product.id);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
          <Link href="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {product.tags[0] && (
            <>
              <Link href={`/shop/${product.tags[0].toLowerCase()}`} className="transition-colors hover:text-foreground">
                {product.tags[0]}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery slug={product.slug} name={product.name} images={product.images} />

          {/* Details */}
          <div className="self-start lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{product.brand}</p>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                N&deg; {number}/1
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
              One of one — once it&apos;s gone, it&apos;s gone
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <p className="font-mono text-3xl font-medium">${product.price}</p>
              {product.sold ? (
                <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Sold Out
                </span>
              ) : (
                product.fireCount > 0 && (
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
                    <HeartIcon />
                    {product.fireCount} on Fire Lists
                  </span>
                )
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/shop/${slugify(tag)}`}
                  className="rounded border border-border px-2 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-6 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Size</dt>
                <dd className="mt-1 font-medium">{product.size}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Condition</dt>
                <dd className="mt-1 font-medium">{product.condition}</dd>
              </div>
              {product.material && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Material</dt>
                  <dd className="mt-1 font-medium">{product.material}</dd>
                </div>
              )}
              {product.country && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Made in</dt>
                  <dd className="mt-1 font-medium">{product.country}</dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Measurements</dt>
                <dd className="mt-1 font-medium">{product.measurements}</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

            {product.flaws && (
              <div className="mt-5 rounded-lg border border-border bg-surface p-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5M12 16.5v.01" strokeLinecap="round" />
                  </svg>
                  Flaws — told straight
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{product.flaws}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {product.sold ? (
                <span className="cursor-not-allowed rounded-full border border-border px-6 py-3 text-sm font-medium text-muted">
                  Sold Out
                </span>
              ) : (
                <>
                  <CartActions product={product} />
                  <MakeOfferDialog product={product} />
                </>
              )}
              <FireListButton product={product} />
            </div>

            {/* Assurances */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {assurances.map(({ icon: Icon, title, note }) => (
                <div key={title} className="flex items-start gap-3 bg-background p-4">
                  <Icon />
                  <div>
                    <p className="text-xs font-medium">{title}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">{note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping / returns / authenticity */}
            <div className="mt-8 divide-y divide-border border-y border-border">
              <InfoRow title="Shipping">
                Packed and shipped within 24 hours via InPost, Orlen Paczka, GLS or DPD. Free shipping on orders of 3
                items or more. International options shown at checkout.
              </InfoRow>
              <InfoRow title="Returns">
                Every piece is one-of-one and described in detail. If it arrives not as described, message us within 48
                hours of delivery and we&apos;ll make it right.
              </InfoRow>
              <InfoRow title="Authenticity & condition">
                Hand-sourced and checked by us, graded <span className="text-foreground">{product.condition}</span>.
                Vintage means character — every mark is described honestly above.
              </InfoRow>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Keep looking</p>
                <h2 className="mt-1 text-2xl font-semibold uppercase tracking-tight">You might also like</h2>
              </div>
              <Link href="/shop" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.04} className="h-full">
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 border-t border-border pt-12">
          <ProductQA slug={product.slug} questions={questions} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ title, children }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium transition-colors hover:text-accent">
        {title}
        <span className="font-mono text-lg text-accent transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <p className="pb-4 text-sm leading-relaxed text-muted">{children}</p>
    </details>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-accent">
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-accent">
      <path d="M6 3h12l3 6-9 12L3 9z" />
      <path d="M3 9h18M9 3l-3 6 6 12 6-12-3-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-accent">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0 text-accent">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-accent">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
