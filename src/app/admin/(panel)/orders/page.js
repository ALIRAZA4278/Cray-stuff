import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import { getAllOrders } from "@/lib/orders";

export const metadata = { title: "Orders — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  const toShip = orders.filter((o) => o.status === "Paid" || o.status === "New").length;
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <AdminHeader eyebrow="Fulfilment" title="Orders" description="Manage orders and shipping." />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders" value={orders.length} />
        <StatCard label="To ship" value={toShip} hint="Paid or new — awaiting dispatch" />
        <StatCard label="Revenue" value={`€${revenue}`} hint="Excludes cancelled" />
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-tight">No orders yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            When a customer checks out, their order shows up here.
          </p>
        </div>
      ) : (
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Piece</th>
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Total</th>
              <th className="px-4 py-3 font-normal">Carrier</th>
              <th className="px-4 py-3 font-normal">Status</th>
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
                <td className="px-4 py-3 font-mono">&euro;{order.total}</td>
                <td className="px-4 py-3 text-muted">{order.carrier}</td>
                <td className="px-4 py-3">
                  <OrderStatusSelect id={order.id} status={order.status} />
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
