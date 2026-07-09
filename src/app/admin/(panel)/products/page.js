import Image from "next/image";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { getAllProducts } from "@/lib/products";

export const metadata = { title: "Products — Admin" };

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <AdminHeader
        eyebrow="Catalog"
        title="Products"
        description={`${products.length} pieces in the catalog`}
        action={
          <Link
            href="/admin/products/new"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            + Add product
          </Link>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Piece</th>
              <th className="px-4 py-3 font-normal">Size</th>
              <th className="px-4 py-3 font-normal">Condition</th>
              <th className="px-4 py-3 font-normal">Price</th>
              <th className="px-4 py-3 font-normal">Fires</th>
              <th className="px-4 py-3 font-normal">Status</th>
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
                <td className="px-4 py-3 font-mono">&euro;{product.price}</td>
                <td className="px-4 py-3 font-mono text-muted">{product.fireCount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.sold ? "Sold Out" : "Live"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${product.id}`} className="text-accent transition-opacity hover:opacity-80">
                    Edit
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
