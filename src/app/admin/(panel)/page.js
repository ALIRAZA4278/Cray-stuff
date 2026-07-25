import Link from "next/link";
import { cookies } from "next/headers";
import { getAdminDict } from "@/lib/admin-i18n";
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
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);
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
      <AdminHeader eyebrow={t.overview} title={t.dashboard} description={t.dashboardDesc} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t.livePieces} value={live} hint={`${sold} ${t.soldOutLower}`} />
        <StatCard label={t.ordersToShip} value={toShip} hint={`${orders.length} ${t.ordersTotal}`} />
        <StatCard label={t.offersToReview} value={pendingOffers.length} hint={t.restAuto} />
        <StatCard label={t.revenue} value={`$${revenue}`} hint={t.excludesCancelled} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <section className="rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.recentOrders}</h2>
            <Link href="/admin/orders" className="font-mono text-[11px] uppercase tracking-widest text-accent hover:opacity-80">
              {t.viewAll}
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted">{t.noOrders}</p>
          ) : (
          <ul>
            {orders.slice(0, 5).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 text-sm last:border-0">
                <div>
                  <p className="font-mono text-xs text-muted">{order.id}</p>
                  <p>{order.product}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">${order.total}</span>
                  <StatusBadge status={order.status} locale={locale} />
                </div>
              </li>
            ))}
          </ul>
          )}
        </section>

        {/* Offers needing review */}
        <section className="rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.offersToReview}</h2>
            <Link href="/admin/offers" className="font-mono text-[11px] uppercase tracking-widest text-accent hover:opacity-80">
              {t.viewAll}
            </Link>
          </div>
          {pendingOffers.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted">{t.nothingWaiting}</p>
          ) : (
            <ul>
              {pendingOffers.map((offer) => (
                <li key={offer.id} className="flex items-center justify-between gap-3 border-b border-border px-5 py-3 text-sm last:border-0">
                  <div>
                    <p>{offer.product}</p>
                    <p className="font-mono text-[11px] text-muted">{offer.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">${offer.offer}</p>
                    <p className="font-mono text-[11px] text-muted">{t.list} ${offer.listPrice}</p>
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
              {messageCount} {t.customerMessages} {t.inInbox}
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
