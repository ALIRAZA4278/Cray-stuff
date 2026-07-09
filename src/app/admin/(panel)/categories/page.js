"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { styleTags, categories as seedCategories } from "@/lib/mock-products";

function TagManager({ title, hint, seed }) {
  const [tags, setTags] = useState(seed);
  const [value, setValue] = useState("");

  function add(event) {
    event.preventDefault();
    const next = value.trim();
    if (next && !tags.some((t) => t.toLowerCase() === next.toLowerCase())) {
      setTags([...tags, next]);
    }
    setValue("");
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{title}</h2>
      <p className="mt-1 text-xs text-muted">{hint}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm capitalize"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
              className="text-muted transition-colors hover:text-red-300"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <form onSubmit={add} className="mt-4 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new…"
          className="flex-1 rounded-lg border border-border bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full border border-border px-5 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          Add
        </button>
      </form>
    </section>
  );
}

export default function AdminCategoriesPage() {
  return (
    <div>
      <AdminHeader eyebrow="Taxonomy" title="Categories & tags" description="Manage the style tags and categories shoppers filter by." />

      <div className="grid gap-6 lg:grid-cols-2">
        <TagManager title="Style tags" hint="Multi-select tags on every product (Vintage, Y2K, Skate…)." seed={styleTags} />
        <TagManager title="Categories" hint="Top-level buckets used in Shop navigation." seed={seedCategories} />
      </div>

      <p className="mt-6 text-xs text-muted">
        Changes here are live in the editor — persistence connects to Supabase once the taxonomy table is added.
      </p>
    </div>
  );
}
