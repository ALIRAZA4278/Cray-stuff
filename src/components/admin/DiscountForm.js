"use client";

import { useActionState, useState } from "react";
import { saveDiscount } from "@/lib/actions/discounts";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

// Create a discount code. Kept simple: fill it in, hit Create, share the code.
export default function DiscountForm() {
  const [state, formAction, pending] = useActionState(saveDiscount, null);
  const [type, setType] = useState("percent");

  return (
    <form action={formAction} className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide">New discount code</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Code</label>
          <input
            name="code"
            required
            placeholder="WELCOME10"
            className={`${inputClass} font-mono uppercase`}
            style={{ textTransform: "uppercase" }}
          />
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select name="type" value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="percent">Percentage off</option>
            <option value="fixed">Fixed amount off ($)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{type === "fixed" ? "Amount ($)" : "Percentage (%)"}</label>
          <input name="value" type="number" min="1" required placeholder={type === "fixed" ? "20" : "10"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            Min. items <span className="normal-case text-muted/70">— e.g. 2 for buy-more deals</span>
          </label>
          <input name="minItems" type="number" min="1" defaultValue="1" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            Max uses <span className="normal-case text-muted/70">— leave empty for unlimited</span>
          </label>
          <input name="maxUses" type="number" min="1" placeholder="Unlimited" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            Expires <span className="normal-case text-muted/70">— optional</span>
          </label>
          <input name="expiresAt" type="date" className={inputClass} />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-[var(--accent)]" />
        Active (customers can use it right away)
      </label>

      {state?.error && <p className="mt-4 text-sm text-red-400">{state.error}</p>}
      {state?.success && <p className="mt-4 text-sm text-emerald-300">Created code “{state.code}”.</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Create code"}
      </button>
    </form>
  );
}
