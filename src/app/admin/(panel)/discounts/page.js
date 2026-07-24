import AdminHeader from "@/components/admin/AdminHeader";
import DiscountForm from "@/components/admin/DiscountForm";
import { getAllDiscounts } from "@/lib/discounts";
import { deleteDiscount } from "@/lib/actions/discounts";

export const metadata = { title: "Discounts — Admin" };

function statusOf(d) {
  if (!d.active) return { label: "Inactive", cls: "text-muted" };
  if (d.expiresAt && new Date(d.expiresAt) < new Date()) return { label: "Expired", cls: "text-red-300" };
  if (d.maxUses != null && d.usedCount >= d.maxUses) return { label: "Used up", cls: "text-red-300" };
  return { label: "Active", cls: "text-emerald-300" };
}

export default async function AdminDiscountsPage() {
  const discounts = await getAllDiscounts();

  return (
    <div className="max-w-4xl">
      <AdminHeader
        eyebrow="Marketing"
        title="Discount codes"
        description="Create codes customers type in at checkout. Great for launch promos and newsletter offers."
      />

      <DiscountForm />

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">Your codes</h2>
        {discounts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
            No codes yet. Create your first one above.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
                <tr>
                  <th className="px-4 py-3 font-normal">Code</th>
                  <th className="px-4 py-3 font-normal">Discount</th>
                  <th className="px-4 py-3 font-normal">Min items</th>
                  <th className="px-4 py-3 font-normal">Used</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((d) => {
                  const status = statusOf(d);
                  return (
                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-3 font-mono font-medium">{d.code}</td>
                      <td className="px-4 py-3">{d.type === "fixed" ? `$${d.value} off` : `${d.value}% off`}</td>
                      <td className="px-4 py-3 text-muted">{d.minItems}</td>
                      <td className="px-4 py-3 text-muted">
                        {d.usedCount}
                        {d.maxUses != null ? ` / ${d.maxUses}` : ""}
                      </td>
                      <td className={`px-4 py-3 font-mono text-[11px] uppercase tracking-widest ${status.cls}`}>
                        {status.label}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <form action={deleteDiscount.bind(null, d.id)}>
                          <button
                            type="submit"
                            className="font-mono text-[11px] uppercase tracking-widest text-red-300 transition-opacity hover:opacity-70"
                          >
                            Delete
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
