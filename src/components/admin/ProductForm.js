"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { saveProduct, deleteProduct } from "@/lib/actions/products";
import { styleTags, categories } from "@/lib/mock-products";
import { clothingTypes, conditions } from "@/lib/shop-filters";
import { getAdminDict } from "@/lib/admin-i18n";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

// Shared create/edit form. Pass `product` to prefill for editing.
export default function ProductForm({ product, locale = "en" }) {
  const t = getAdminDict(locale);
  const [state, formAction, pending] = useActionState(saveProduct, null);
  const isEdit = Boolean(product);
  const [imagesText, setImagesText] = useState((product?.images || []).join("\n"));
  // Split on newlines only — Cloudinary transform URLs contain commas
  // (e.g. f_auto,q_auto,c_limit,w_1600), so we must not split on commas.
  const imageUrls = imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Drop one photo from the list (rebuilds the textarea without that URL).
  function removeImage(index) {
    setImagesText(imageUrls.filter((_, i) => i !== index).join("\n"));
  }

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
        // Deliver a browser-friendly format. f_auto converts HEIC (iPhone) and
        // anything else to WebP/JPG on the fly; q_auto + c_limit keep it light.
        const url = data.secure_url.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_1600/");
        setImagesText((prev) => (prev ? `${prev}\n${url}` : url));
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
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.photos}</h2>
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
              {uploading ? t.uploading : t.uploadPhotos}
            </button>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted">{t.photosHint}</p>
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
              <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white">
                    {t.mainBadge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  aria-label="Remove photo"
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-colors hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-muted">{t.uploadsNote}</p>
        {uploadError && <p className="mt-1 text-xs text-red-400">{t.uploadFailedPrefix}: {uploadError}</p>}
      </section>

      {/* Core details */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.productName}</label>
          <input name="name" required defaultValue={product?.name} placeholder="Vintage Denim Jacket" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.brand}</label>
          <input name="brand" required defaultValue={product?.brand} placeholder="Levi's" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.fit} <span className="normal-case text-muted/70">— {t.fitHint}</span>
          </label>
          <input name="size" defaultValue={product?.size} placeholder="M/L" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.price} <span className="normal-case text-muted/70">(zł)</span>
          </label>
          <input name="price" type="number" required defaultValue={product?.price} placeholder="149" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            {t.minOffer} <span className="normal-case text-muted/70">— {t.minOfferHint}</span>
          </label>
          <input name="minOffer" type="number" defaultValue={product?.minOffer} placeholder="125" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.condition}</label>
          <select name="condition" defaultValue={product?.condition || "Very Good"} className={inputClass}>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.category}</label>
          <select name="category" defaultValue={product?.category || "mens"} className={inputClass}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.measurements}</label>
          <input name="measurements" defaultValue={product?.measurements} placeholder="Chest 22in · Length 27in · Sleeve 25in" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>
            {t.flaws} <span className="normal-case text-muted/70">— {t.flawsHint}</span>
          </label>
          <textarea
            name="flaws"
            rows={2}
            defaultValue={product?.flaws}
            placeholder="Small stain on left cuff · slight fading at the hem. Leave empty if there are none."
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>{t.description}</label>
          <textarea name="description" rows={4} defaultValue={product?.description} placeholder="Honest condition notes, fit, and story…" className={`${inputClass} resize-none`} />
        </div>
      </section>

      {/* Clothing type — what the piece IS (stored alongside style tags) */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.type}</h2>
        <p className="mt-1 text-xs text-muted">{t.typeHint}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {clothingTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="checkbox"
                name="tags"
                value={type}
                defaultChecked={product?.tags?.includes(type)}
                className="peer sr-only"
              />
              <span className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-foreground">
                {type}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Style tags */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.styleTags}</h2>
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
          {t.markAs} <span className="font-medium">{t.soldOut}</span>
          <span className="ml-2 text-xs text-muted">{t.soldHint}</span>
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
          {pending ? t.saving : isEdit ? t.saveChanges : t.createProduct}
        </button>
        <Link href="/admin/products" className="text-sm text-muted transition-colors hover:text-foreground">
          {t.cancel}
        </Link>
        {isEdit && (
          // Its own formAction so it deletes instead of submitting the save form.
          // (A nested <form> here is invalid HTML and silently triggered Save.)
          <button
            type="submit"
            formAction={deleteProduct.bind(null, product.id)}
            className="ml-auto rounded-full border border-red-500/40 px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10"
          >
            {t.del}
          </button>
        )}
      </div>
    </form>
  );
}
