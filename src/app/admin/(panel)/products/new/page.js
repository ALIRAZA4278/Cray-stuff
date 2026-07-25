import { cookies } from "next/headers";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Add product — Admin" };

export default async function AdminNewProductPage() {
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);

  return (
    <div>
      <AdminHeader eyebrow={t.catalog} title={t.addProduct} description={t.addProductDesc} />
      <ProductForm locale={locale} />
    </div>
  );
}
