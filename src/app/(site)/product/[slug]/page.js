import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGallery from "@/components/product/ProductGallery";
import MakeOfferDialog from "@/components/product/MakeOfferDialog";
import FireListButton from "@/components/product/FireListButton";
import ProductQA from "@/components/product/ProductQA";
import { getProductBySlug } from "@/lib/mock-products";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery slug={product.slug} name={product.name} />

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{product.brand}</p>
            <h1 className="mt-2 text-3xl font-semibold uppercase tracking-tight">{product.name}</h1>
            <p className="mt-4 font-mono text-2xl font-medium">&euro;{product.price}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded border border-border px-2 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-6 text-sm">
              <div>
                <dt className="text-muted">Size</dt>
                <dd className="mt-1 font-medium">{product.size}</dd>
              </div>
              <div>
                <dt className="text-muted">Condition</dt>
                <dd className="mt-1 font-medium">{product.condition}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted">Measurements</dt>
                <dd className="mt-1 font-medium">{product.measurements}</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/checkout"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Buy now
              </Link>
              <MakeOfferDialog price={product.price} minOffer={product.minOffer} />
              <FireListButton />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <ProductQA />
        </div>
      </div>
    </div>
  );
}
