import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({ children }) {
  await requireAdmin();
  const locale = (await cookies()).get("admin-locale")?.value || "en";

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar locale={locale} />
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
}
