import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductCatalogFilters from "@/components/admin/ProductCatalogFilters";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { cookies } from "next/headers";
import { getAdminDict, getStatusLabel } from "@/lib/admin-i18n";

export const metadata = { title: "Products — Admin" };

export default async function AdminProductsPage({ searchParams }) {
  const params = (await searchParams) || {};
  const status = params.status || null;
  const category = params.category || null;
  // Compact is the default: managing a catalog is a scanning job, not a
  // browsing one, so more tiles on screen beats bigger photos here. "Large"
  // stays available for when a photo actually needs checking.
  const density = params.density === "large" ? "large" : null;

  const all = await getAllProducts();
  const products = all.filter((p) => {
    if (status === "available" && p.sold) return false;
    if (status === "sold" && !p.sold) return false;
    if (category && p.category !== category) return false;
    return true;
  });

  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);
  const baseParams = new URLSearchParams(params);

  const gridClass =
    density === "large"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      : "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8";

  const description =
    products.length === all.length
      ? `${all.length} ${t.piecesInCatalog}`
      : `${products.length} ${t.fltShowing} · ${all.length} ${t.piecesInCatalog}`;

  return (
    <div>
      <AdminHeader
        eyebrow={t.catalog}
        title={t.products}
        description={description}
        action={
          <Link
            href="/admin/products/new"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.addProductBtn}
          </Link>
        }
      />

      <ProductCatalogFilters
        params={baseParams}
        status={status}
        category={category}
        density={density}
        labels={{
          status: t.fltStatus,
          all: t.fltAll,
          available: t.fltAvailable,
          sold: t.fltSold,
          category: t.fltCategory,
          mens: t.fltMens,
          womens: t.fltWomens,
          unisex: t.fltUnisex,
          density: t.fltDensity,
          compact: t.fltCompact,
          large: t.fltLarge,
        }}
      />

      <div className={gridClass}>
        {products.map((product) => {
          const img = product.images && product.images.length ? product.images[0] : null;
          return (
            <div key={product.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
              <Link href={`/admin/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] bg-background">
                  {img ? (
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      sizes={density === "large" ? "(max-width: 640px) 50vw, 240px" : "(max-width: 640px) 33vw, 160px"}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center font-mono text-[9px] uppercase tracking-widest text-muted">
                      No photo
                    </div>
                  )}
                  {product.sold && (
                    <span className="absolute left-1.5 top-1.5 rounded-sm border border-white/40 bg-background/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-foreground backdrop-blur">
                      {getStatusLabel(locale, "Sold Out")}
                    </span>
                  )}
                </div>
                <div className={density === "large" ? "p-3" : "p-2"}>
                  <p translate="no" className="notranslate truncate font-mono text-[9px] uppercase tracking-wide text-accent">
                    {product.brand}
                  </p>
                  <p translate="no" className="notranslate mt-0.5 line-clamp-2 text-xs font-medium leading-snug">
                    {product.name}
                  </p>
                  <p className="mt-1 font-mono text-xs">{formatPrice(product.price, "PLN")}</p>
                  <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-wide text-muted">
                    {product.size} &middot; {product.condition}
                  </p>
                </div>
              </Link>
              <div className="mt-auto flex border-t border-border text-center font-mono text-[10px] uppercase tracking-widest">
                <Link href={`/admin/products/${product.id}`} className="flex-1 py-1.5 text-accent transition-colors hover:bg-surface">
                  {t.edit}
                </Link>
                <DeleteProductButton
                  id={product.id}
                  label={t.del}
                  confirmText={t.deleteConfirm}
                  className="flex-1 border-l border-border py-1.5"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
