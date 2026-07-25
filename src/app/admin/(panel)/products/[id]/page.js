import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";
import { pieceNumber } from "@/lib/piece-number";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Edit product — Admin" };

export default async function AdminEditProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);

  return (
    <div>
      <AdminHeader eyebrow={t.catalog} title={`${t.edit} — ${product.name}`} description={`${product.brand} · N° ${pieceNumber(product.id)}/1`} />
      <ProductForm product={product} locale={locale} />
    </div>
  );
}
