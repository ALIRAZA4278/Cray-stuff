"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { saveReview } from "@/lib/actions/reviews";
import { getAdminDict } from "@/lib/admin-i18n";

const field = "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent";
const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted";

// Add or edit one customer review. Same component for both: passing `review`
// switches it to edit mode and carries the id through as a hidden field.
export default function ReviewForm({ locale = "en", review = null }) {
  const t = getAdminDict(locale);
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveReview, null);
  const editing = Boolean(review);

  return (
    <section className="rounded-lg border border-border p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted">
        {editing ? t.editReview : t.addReview}
      </h2>
      <p className="mt-1 text-sm text-muted">{t.reviewsFormDesc}</p>

      {/* key forces a fresh form (and fresh defaultValues) when switching
          between adding and editing a different review. */}
      <form key={review?.id || "new"} action={formAction} className="mt-4 grid gap-4 sm:grid-cols-2">
        {editing && <input type="hidden" name="id" value={review.id} />}

        <div>
          <label className={labelCls} htmlFor="review-name">{t.reviewName}</label>
          <input id="review-name" name="name" required defaultValue={review?.name || ""} className={field} />
        </div>

        <div>
          <label className={labelCls} htmlFor="review-source">{t.reviewSource}</label>
          <input id="review-source" name="source" defaultValue={review?.source || "Vinted"} className={field} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="review-text">{t.reviewText}</label>
          <textarea id="review-text" name="text" required rows={4} defaultValue={review?.text || ""} className={field} />
        </div>

        <div>
          <label className={labelCls} htmlFor="review-rating">{t.reviewRating}</label>
          <select id="review-rating" name="rating" defaultValue={review?.rating ?? 5} className={field}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n} className="bg-background">
                {"★".repeat(n)} ({n})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="review-order">{t.reviewOrder}</label>
          <input
            id="review-order"
            name="sortOrder"
            type="number"
            defaultValue={review?.sortOrder ?? 0}
            className={field}
          />
        </div>

        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="published" defaultChecked={review ? review.published : true} className="accent-accent" />
          {t.reviewPublished}
        </label>

        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? t.saving : editing ? t.saveChanges : t.addReview}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => router.push("/admin/reviews")}
              className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {t.cancel}
            </button>
          )}
          {state?.error && <span className="text-sm text-red-400">{state.error}</span>}
          {state?.success && <span className="text-sm text-emerald-300">{t.reviewSaved}</span>}
        </div>
      </form>
    </section>
  );
}
