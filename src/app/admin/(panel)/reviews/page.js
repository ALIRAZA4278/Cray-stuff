import Link from "next/link";
import { cookies } from "next/headers";
import AdminHeader from "@/components/admin/AdminHeader";
import ReviewForm from "@/components/admin/ReviewForm";
import ReviewCountForm from "@/components/admin/ReviewCountForm";
import { getAllReviews } from "@/lib/customer-reviews";
import { getReviewCount } from "@/lib/settings";
import { deleteReview } from "@/lib/actions/reviews";
import { getAdminDict } from "@/lib/admin-i18n";

export const metadata = { title: "Reviews — Admin" };

// Individual review management. The public total (site_settings.review_count)
// and the individual quotes are two different things, so both live here:
// the count is the Vinted-wide social proof, the quotes are hand-picked.
export default async function AdminReviewsPage({ searchParams }) {
  const locale = (await cookies()).get("admin-locale")?.value || "en";
  const t = getAdminDict(locale);
  const params = (await searchParams) || {};

  const [reviews, reviewCount] = await Promise.all([getAllReviews(), getReviewCount()]);
  const editing = params.edit ? reviews.find((r) => String(r.id) === String(params.edit)) || null : null;

  return (
    <div className="max-w-4xl">
      <AdminHeader eyebrow={t.marketing} title={t.reviews} description={t.reviewsDesc} />

      <div className="space-y-6">
        <ReviewCountForm current={reviewCount} locale={locale} />
        <ReviewForm locale={locale} review={editing} />
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">{t.yourReviews}</h2>
        {reviews.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
            {t.noReviewsYet}
          </div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li
                key={r.id}
                className={`rounded-lg border border-border p-4 ${r.published ? "" : "opacity-60"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">
                      {"★".repeat(r.rating)}
                      <span className="ml-2 text-muted">{r.name}</span>
                      <span className="ml-2 text-muted">· {r.source}</span>
                      {!r.published && <span className="ml-2 text-muted">· {t.reviewHidden}</span>}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed">{r.text}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                    <Link href={`/admin/reviews?edit=${r.id}`} className="text-accent transition-opacity hover:opacity-70">
                      {t.edit}
                    </Link>
                    <form action={deleteReview.bind(null, r.id)}>
                      <button type="submit" className="text-red-300 transition-opacity hover:opacity-70">
                        {t.del}
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
