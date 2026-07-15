import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";
import { pieceNumber } from "@/lib/piece-number";

export const metadata = { title: "Edit product — Admin" };

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <div>
      <AdminHeader eyebrow="Catalog" title={`Edit — ${product.name}`} description={`${product.brand} · N° ${pieceNumber(product.id)}/1`} />
      <ProductForm product={product} />
    </div>
  );
}
