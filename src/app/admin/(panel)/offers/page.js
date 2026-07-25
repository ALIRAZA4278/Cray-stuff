import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import OfferActions from "@/components/admin/OfferActions";
import { getAllOffers } from "@/lib/offers";
import { cookies } from "next/headers";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Offers — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const offers = await getAllOffers();
  const pending = offers.filter((o) => o.status === "Pending");
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);

  return (
    <div>
      <AdminHeader
        eyebrow={t.makeAnOffer}
        title={t.offers}
        description={t.offersDesc}
      />

      <div className="mb-6 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        <span className="font-medium text-foreground">
          {pending.length} {t.needReview}
        </span>{" "}
        {t.handledAuto}
      </div>

      {offers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-tight">{t.noOffersTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            {t.noOffersBody}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
              <tr>
                <th className="px-4 py-3 font-normal">{t.piece}</th>
                <th className="px-4 py-3 font-normal">{t.customer}</th>
                <th className="px-4 py-3 font-normal">{t.thOffer}</th>
                <th className="px-4 py-3 font-normal">{t.thListPrice}</th>
                <th className="px-4 py-3 font-normal">{t.thMin}</th>
                <th className="px-4 py-3 font-normal">{t.status}</th>
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
                  <td className="px-4 py-3 font-mono font-medium">${offer.offer}</td>
                  <td className="px-4 py-3 font-mono text-muted">{offer.listPrice != null ? `$${offer.listPrice}` : "—"}</td>
                  <td className="px-4 py-3 font-mono text-muted">{offer.minOffer != null ? `$${offer.minOffer}` : "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={offer.status} locale={locale} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {offer.status === "Pending" ? (
                      <OfferActions id={offer.id} locale={locale} />
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{t.autoHandled}</span>
                    )}
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
