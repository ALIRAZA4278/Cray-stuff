"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { saveProduct, deleteProduct } from "@/lib/actions/products";
import { styleTags, categories } from "@/lib/mock-products";
import { conditions } from "@/lib/shop-filters";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

// Shared create/edit form. Pass `product` to prefill for editing.
export default function ProductForm({ product }) {
  const [state, formAction, pending] = useActionState(saveProduct, null);
  const isEdit = Boolean(product);
  const [imagesText, setImagesText] = useState((product?.images || []).join("\n"));
  const imageUrls = imagesText.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Signed direct-to-Cloudinary upload: the browser gets a signature from our
  // admin-only endpoint, then posts the file straight to Cloudinary.
  async function uploadFiles(files) {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    setUploadError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const timestamp = Math.round(Date.now() / 1000);
        const folder = "cray-stuff/products";
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paramsToSign: { timestamp, folder } }),
        });
        if (!signRes.ok) throw new Error("not authorised — sign in as admin");
        const { signature } = await signRes.json();

        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", apiKey);
        fd.append("timestamp", timestamp);
        fd.append("folder", folder);
        fd.append("signature", signature);

        const upRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body: fd });
        const data = await upRes.json();
        if (!data.secure_url) throw new Error(data.error?.message || "upload failed");
        setImagesText((prev) => (prev ? `${prev}\n${data.secure_url}` : data.secure_url));
      }
    } catch (e) {
      setUploadError(e.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      {/* Images */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">Photos</h2>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files?.length && uploadFiles(e.target.files)}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {uploading ? "Uploading…" : "Upload photos"}
            </button>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted">
          Upload from your device, or paste image links below — one per line. The first is the main photo.
        </p>
        <textarea
          name="images"
          rows={4}
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          placeholder={"https://…/photo-1.jpg\nhttps://…/photo-2.jpg"}
          className={`${inputClass} mt-3 resize-none font-mono text-xs`}
        />
        {imageUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-muted">
          Uploads are stored on Cloudinary and served fast, auto-optimised worldwide.
        </p>
        {uploadError && <p className="mt-1 text-xs text-red-400">Upload failed: {uploadError}</p>}
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
            {conditions.map((c) => (
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
        {isEdit && (
          <form action={deleteProduct.bind(null, product.id)} className="ml-auto">
            <button
              type="submit"
              className="rounded-full border border-red-500/40 px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10"
            >
              Delete
            </button>
          </form>
        )}
      </div>
    </form>
  );
}
