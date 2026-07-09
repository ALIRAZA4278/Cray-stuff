import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { getAllProducts } from "@/lib/products";
import { getAllOrders } from "@/lib/orders";
import { getAllOffers } from "@/lib/offers";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Dashboard — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, orders, offers] = await Promise.all([getAllProducts(), getAllOrders(), getAllOffers()]);
  const live = products.filter((p) => !p.sold).length;
  const sold = products.filter((p) => p.sold).length;
  const toShip = orders.filter((o) => o.status === "Paid" || o.status === "New").length;
  const pendingOffers = offers.filter((o) => o.status === "Pending");
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  let messageCount = 0;
  const supabase = createAdminClient();
  const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true });
  if (count) messageCount = count;

  return (
    <div>
      <AdminHeader eyebrow="Overview" title="Dashboard" description="Everything happening across CRAY STUFF at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Live pieces" value={live} hint={`${sold} sold out`} />
        <StatCard label="Orders to ship" value={toShip} hint={`${orders.length} orders total`} />
        <StatCard label="Offers to review" value={pendingOffers.length} hint="Rest auto-handled" />
        <StatCard label="Revenue" value={`€${revenue}`} hint="Excludes cancelled" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <section className="rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Recent orders</h2>
            <Link href="/admin/orders" className="font-mono text-[11px] uppercase tracking-widest text-accent hover:opacity-80">
              View all
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted">No orders yet.</p>
          ) : (
          <ul>
            {orders.slice(0, 5).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 text-sm last:border-0">
                <div>
                  <p className="font-mono text-xs text-muted">{order.id}</p>
                  <p>{order.product}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">&euro;{order.total}</span>
                  <StatusBadge status={order.status} />
                </div>
              </li>
            ))}
          </ul>
          )}
        </section>

        {/* Offers needing review */}
        <section className="rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Offers to review</h2>
            <Link href="/admin/offers" className="font-mono text-[11px] uppercase tracking-widest text-accent hover:opacity-80">
              View all
            </Link>
          </div>
          {pendingOffers.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted">Nothing waiting — all offers auto-handled.</p>
          ) : (
            <ul>
              {pendingOffers.map((offer) => (
                <li key={offer.id} className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 text-sm last:border-0">
                  <div>
                    <p>{offer.product}</p>
                    <p className="font-mono text-[11px] text-muted">{offer.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">&euro;{offer.offer}</p>
                    <p className="font-mono text-[11px] text-muted">list &euro;{offer.listPrice}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {messageCount > 0 && (
            <Link
              href="/admin/messages"
              className="block border-t border-border px-5 py-3 text-sm text-accent transition-opacity hover:opacity-80"
            >
              {messageCount} customer message{messageCount === 1 ? "" : "s"} in the inbox &rarr;
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
