import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { getAllOrders } from "@/lib/orders";
import { cookies } from "next/headers";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Orders — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);
  const orders = await getAllOrders();
  const toShip = orders.filter((o) => o.status === "Paid" || o.status === "New").length;
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <AdminHeader eyebrow={t.fulfilment} title={t.orders} description={t.ordersDesc} />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={t.totalOrders} value={orders.length} />
        <StatCard label={t.toShip} value={toShip} hint={t.toShipHint} />
        <StatCard label={t.revenue} value={`$${revenue}`} hint={t.excludesCancelled} />
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-tight">{t.noOrdersTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {t.noOrdersBody}
          </p>
        </div>
      ) : (
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">{t.thOrder}</th>
              <th className="px-4 py-3 font-normal">{t.customer}</th>
              <th className="px-4 py-3 font-normal">{t.piece}</th>
              <th className="px-4 py-3 font-normal">{t.thDate}</th>
              <th className="px-4 py-3 font-normal">{t.thTotal}</th>
              <th className="px-4 py-3 font-normal">{t.thCarrier}</th>
              <th className="px-4 py-3 font-normal">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-4 py-3 font-mono">{order.id}</td>
                <td className="px-4 py-3">
                  <p>{order.customer}</p>
                  <p className="font-mono text-[11px] text-muted">{order.email}</p>
                </td>
                <td className="px-4 py-3 text-muted">{order.product}</td>
                <td className="px-4 py-3 font-mono text-muted">{order.date}</td>
                <td className="px-4 py-3 font-mono">${order.total}</td>
                <td className="px-4 py-3 text-muted">{order.carrier}</td>
                <td className="px-4 py-3">
                  <OrderStatusSelect id={order.id} status={order.status} locale={locale} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
