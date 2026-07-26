import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { cookies } from "next/headers";
import { getAdminDict, getStatusLabel } from "@/lib/admin-i18n";

export const metadata = { title: "Products — Admin" };

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);

  return (
    <div>
      <AdminHeader
        eyebrow={t.catalog}
        title={t.products}
        description={`${products.length} ${t.piecesInCatalog}`}
        action={
          <Link
            href="/admin/products/new"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.addProductBtn}
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const img = product.images && product.images.length ? product.images[0] : null;
          return (
            <div key={product.id} className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
              <Link href={`/admin/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] bg-background">
                  {img ? (
                    <Image src={img} alt={product.name} fill sizes="(max-width: 640px) 50vw, 240px" className="object-cover grayscale-[20%]" />
                  ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
                      No photo
                    </div>
                  )}
                  {product.sold && (
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded-sm bg-red-600/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white">
                      {getStatusLabel(locale, "Sold Out")}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate font-mono text-[10px] uppercase tracking-wide text-accent">{product.brand}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug">{product.name}</p>
                  <p className="mt-1 font-mono text-sm">{formatPrice(product.price, "PLN")}</p>
                  <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-wide text-muted">
                    {product.size} &middot; {product.condition}
                  </p>
                </div>
              </Link>
              <div className="mt-auto flex border-t border-border text-center font-mono text-[11px] uppercase tracking-widest">
                <Link href={`/admin/products/${product.id}`} className="flex-1 py-2 text-accent transition-colors hover:bg-surface">
                  {t.edit}
                </Link>
                <DeleteProductButton
                  id={product.id}
                  label={t.del}
                  confirmText={t.deleteConfirm}
                  className="flex-1 border-l border-border"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
