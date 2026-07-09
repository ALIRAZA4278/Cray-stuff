import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { sampleOffers } from "@/lib/admin-data";

export const metadata = { title: "Offers — Admin" };

export default function AdminOffersPage() {
  const offers = sampleOffers;
  const pending = offers.filter((o) => o.status === "Pending");

  return (
    <div>
      <AdminHeader eyebrow="Make an Offer" title="Offers" description="Offers auto-accept at/above the min price and auto-counter below it. Review anything without a min set here." />

      <div className="mb-6 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        <span className="font-medium text-foreground">{pending.length} offer{pending.length === 1 ? "" : "s"} need your review.</span>{" "}
        Everything else was handled automatically by the min-price rule.
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3 font-normal">Piece</th>
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Offer</th>
              <th className="px-4 py-3 font-normal">List</th>
              <th className="px-4 py-3 font-normal">Min</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-4 py-3">{offer.product}</td>
                <td className="px-4 py-3">
                  <p>{offer.customer}</p>
                  <p className="font-mono text-[11px] text-muted">{offer.email}</p>
                </td>
                <td className="px-4 py-3 font-mono font-medium">&euro;{offer.offer}</td>
                <td className="px-4 py-3 font-mono text-muted">&euro;{offer.listPrice}</td>
                <td className="px-4 py-3 font-mono text-muted">&euro;{offer.minOffer}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={offer.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {offer.status === "Pending" ? (
                    <div className="flex justify-end gap-2">
                      <button className="rounded-full border border-emerald-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500/10">
                        Accept
                      </button>
                      <button className="rounded-full border border-red-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10">
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Auto-handled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
