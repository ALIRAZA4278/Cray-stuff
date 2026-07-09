import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { mockProducts } from "@/lib/mock-products";

export const metadata = { title: "Edit product — Admin" };

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;
  const product = mockProducts.find((p) => String(p.id) === String(id));

  if (!product) notFound();

  return (
    <div>
      <AdminHeader eyebrow="Catalog" title={`Edit — ${product.name}`} description={`${product.brand} · N° ${String(product.id).padStart(3, "0")}/1`} />
      <ProductForm product={product} />
    </div>
  );
}
