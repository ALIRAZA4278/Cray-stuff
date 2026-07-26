"use client";

import { deleteProduct } from "@/lib/actions/products";

// Delete a product straight from the grid, with a confirm so it can't happen by
// accident. Its own form (not nested in the edit form), so it actually deletes.
export default function DeleteProductButton({ id, label, confirmText, className = "" }) {
  return (
    <form
      action={deleteProduct.bind(null, id)}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
      className={className}
    >
      <button type="submit" className="w-full py-2 text-red-300 transition-colors hover:bg-red-500/10">
        {label}
      </button>
    </form>
  );
}
