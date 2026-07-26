import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { cookies } from "next/headers";
import { getAdminDict } from "@/lib/admin-i18n";

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

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">{t.piece}</th>
              <th className="px-4 py-3 font-normal">{t.fit}</th>
              <th className="px-4 py-3 font-normal">{t.condition}</th>
              <th className="px-4 py-3 font-normal">{t.price}</th>
              <th className="px-4 py-3 font-normal">{t.fires}</th>
              <th className="px-4 py-3 font-normal">{t.status}</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://picsum.photos/seed/${product.slug}/80/100`}
                      alt=""
                      width={36}
                      height={45}
                      className="h-11 w-9 rounded object-cover grayscale-[40%]"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{product.size}</td>
                <td className="px-4 py-3 text-muted">{product.condition}</td>
                <td className="px-4 py-3 font-mono">{formatPrice(product.price, "PLN")}</td>
                <td className="px-4 py-3 font-mono text-muted">{product.fireCount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.sold ? "Sold Out" : "Live"} locale={locale} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${product.id}`} className="text-accent transition-opacity hover:opacity-80">
                    {t.edit}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
