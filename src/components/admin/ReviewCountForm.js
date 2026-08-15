"use client";

import { useActionState } from "react";
import { saveReviewCount } from "@/lib/actions/settings";
import { getAdminDict } from "@/lib/admin-i18n";

// Small dashboard control: the public review count shown across the storefront.
export default function ReviewCountForm({ current, locale = "en" }) {
  const t = getAdminDict(locale);
  const [state, formAction, pending] = useActionState(saveReviewCount, null);

  return (
    <section className="rounded-lg border border-border p-5">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.reviewCountTitle}</h2>
      <p className="mt-1 text-sm text-muted">{t.reviewCountDesc}</p>
      <form action={formAction} className="mt-4 flex flex-wrap items-center gap-3">
        <input
          name="reviewCount"
          type="number"
          min="0"
          required
          defaultValue={current}
          className="w-32 rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? t.saving : t.save}
        </button>
        {state?.error && <span className="text-sm text-red-400">{state.error}</span>}
        {state?.success && <span className="text-sm text-emerald-300">{t.reviewCountSaved}</span>}
      </form>
    </section>
  );
}
