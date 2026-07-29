import { cookies } from "next/headers";
import AdminHeader from "@/components/admin/AdminHeader";
import DiscountForm from "@/components/admin/DiscountForm";
import { getAllDiscounts } from "@/lib/discounts";
import { deleteDiscount } from "@/lib/actions/discounts";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Discounts — Admin" };

function statusOf(d) {
  if (!d.active) return { key: "inactive", cls: "text-muted" };
  if (d.expiresAt && new Date(d.expiresAt) < new Date()) return { key: "expired", cls: "text-red-300" };
  if (d.maxUses != null && d.usedCount >= d.maxUses) return { key: "usedUp", cls: "text-red-300" };
  return { key: "active", cls: "text-emerald-300" };
}

export default async function AdminDiscountsPage() {
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);
  const discounts = await getAllDiscounts();

  const statusLabels = {
    active: t.stActive,
    inactive: t.stInactive,
    expired: t.stExpired,
    usedUp: t.stUsedUp,
  };

  return (
    <div className="max-w-4xl">
      <AdminHeader
        eyebrow={t.marketing}
        title={t.discountCodes}
        description={t.discountsDesc}
      />

      <DiscountForm locale={locale} />

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">{t.yourCodes}</h2>
        {discounts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
            {t.noCodesYet}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
                <tr>
                  <th className="px-4 py-3 font-normal">{t.code}</th>
                  <th className="px-4 py-3 font-normal">{t.discountCol}</th>
                  <th className="px-4 py-3 font-normal">{t.minItems}</th>
                  <th className="px-4 py-3 font-normal">{t.usedCol}</th>
                  <th className="px-4 py-3 font-normal">{t.status}</th>
                  <th className="px-4 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((d) => {
                  const status = statusOf(d);
                  return (
                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-3 font-mono font-medium">{d.code}</td>
                      <td className="px-4 py-3">
                        {d.type === "fixed" ? `$${d.value} off` : d.type === "bogo" ? `${d.value}% off 2nd item` : `${d.value}% off`}
                      </td>
                      <td className="px-4 py-3 text-muted">{d.minItems}</td>
                      <td className="px-4 py-3 text-muted">
                        {d.usedCount}
                        {d.maxUses != null ? ` / ${d.maxUses}` : ""}
                      </td>
                      <td className={`px-4 py-3 font-mono text-[11px] uppercase tracking-widest ${status.cls}`}>
                        {statusLabels[status.key]}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <form action={deleteDiscount.bind(null, d.id)}>
                          <button
                            type="submit"
                            className="font-mono text-[11px] uppercase tracking-widest text-red-300 transition-opacity hover:opacity-70"
                          >
                            {t.del}
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
