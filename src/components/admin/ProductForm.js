"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveProduct } from "@/lib/actions/products";
import { styleTags, categories } from "@/lib/mock-products";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

// Shared create/edit form. Pass `product` to prefill for editing.
export default function ProductForm({ product }) {
  const [state, formAction, pending] = useActionState(saveProduct, null);
  const isEdit = Boolean(product);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      {/* Images */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Photos</h2>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-border bg-surface text-2xl text-muted transition-colors hover:border-accent"
            >
              +
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          7–25 photos per piece. Upload wires to Cloudinary — tag mannequin / lifestyle shots when connected.
        </p>
      </section>

      {/* Core details */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Product name</label>
          <input name="name" required defaultValue={product?.name} placeholder="Vintage Denim Jacket" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Brand</label>
          <input name="brand" required defaultValue={product?.brand} placeholder="Levi's" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Size</label>
          <input name="size" defaultValue={product?.size} placeholder="L" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Price (€)</label>
          <input name="price" type="number" required defaultValue={product?.price} placeholder="149" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            Min. offer (€) <span className="normal-case text-muted/70">— hidden from customers</span>
          </label>
          <input name="minOffer" type="number" defaultValue={product?.minOffer} placeholder="125" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Condition</label>
          <select name="condition" defaultValue={product?.condition || "Very Good"} className={inputClass}>
            {["Excellent", "Very Good", "Good"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="category" defaultValue={product?.category || "mens"} className={inputClass}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Measurements</label>
          <input name="measurements" defaultValue={product?.measurements} placeholder="Chest 22in · Length 27in · Sleeve 25in" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea name="description" rows={4} defaultValue={product?.description} placeholder="Honest condition notes, fit, and story…" className={`${inputClass} resize-none`} />
        </div>
      </section>

      {/* Style tags */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Style tags</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {styleTags.map((tag) => (
            <label key={tag} className="cursor-pointer">
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={product?.tags?.includes(tag)}
                className="peer sr-only"
              />
              <span className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-foreground">
                {tag}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Sold toggle */}
      <section className="flex items-center gap-3">
        <input
          id="sold"
          type="checkbox"
          name="sold"
          defaultChecked={product?.sold}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        <label htmlFor="sold" className="text-sm">
          Mark as <span className="font-medium">Sold Out</span>
          <span className="ml-2 text-xs text-muted">stays visible, removed from Buy Now / offers</span>
        </label>
      </section>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state?.success && (
        <p className="text-sm text-emerald-300">
          Saved “{state.name}”. (Persistence connects to Supabase once the products table is live.)
        </p>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
        <Link href="/admin/products" className="text-sm text-muted transition-colors hover:text-foreground">
          Cancel
        </Link>
      </div>
    </form>
  );
}
