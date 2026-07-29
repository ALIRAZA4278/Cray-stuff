"use client";

import { useActionState, useState } from "react";
import { saveDiscount } from "@/lib/actions/discounts";
import { getAdminDict } from "@/lib/admin-i18n";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

// Create a discount code. Kept simple: fill it in, hit Create, share the code.
export default function DiscountForm({ locale = "en" }) {
  const t = getAdminDict(locale);
  const [state, formAction, pending] = useActionState(saveDiscount, null);
  const [type, setType] = useState("percent");

  return (
    <form action={formAction} className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide">{t.newDiscountCode}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t.code}</label>
          <input
            name="code"
            required
            placeholder="WELCOME10"
            className={`${inputClass} font-mono uppercase`}
            style={{ textTransform: "uppercase" }}
          />
        </div>
        <div>
          <label className={labelClass}>{t.type}</label>
          <select name="type" value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="percent">{t.percentOff}</option>
            <option value="fixed">{t.fixedOff}</option>
            <option value="bogo">{t.bogoOff}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{type === "fixed" ? t.amountLabel : t.percentageLabel}</label>
          <input name="value" type="number" min="1" required placeholder={type === "fixed" ? "20" : "10"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.minItems} <span className="normal-case text-muted/70">— {t.minItemsHint}</span>
          </label>
          <input name="minItems" type="number" min="1" defaultValue="1" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.maxUses} <span className="normal-case text-muted/70">— {t.maxUsesHint}</span>
          </label>
          <input name="maxUses" type="number" min="1" placeholder={t.unlimited} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.expires} <span className="normal-case text-muted/70">— {t.optional}</span>
          </label>
          <input name="expiresAt" type="date" className={inputClass} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-[var(--accent)]" />
          {t.activeLine}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="firstOrderOnly" className="h-4 w-4 accent-[var(--accent)]" />
          {t.firstOrderOnly}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="oncePerCustomer" className="h-4 w-4 accent-[var(--accent)]" />
          {t.oncePerCustomer}
        </label>
      </div>

      {state?.error && <p className="mt-4 text-sm text-red-400">{state.error}</p>}
      {state?.success && <p className="mt-4 text-sm text-emerald-300">Created code “{state.code}”.</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? t.saving : t.createCode}
      </button>
    </form>
  );
}
