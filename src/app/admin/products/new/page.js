import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Add product — Admin" };

export default function AdminNewProductPage() {
  return (
    <div>
      <AdminHeader eyebrow="Catalog" title="Add product" description="List a new one-of-one piece." />
      <ProductForm />
    </div>
  );
}
