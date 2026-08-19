"use client";

import { useState, useTransition } from "react";
import { deleteOrder } from "@/lib/actions/orders";
import { getAdminDict } from "@/lib/admin-i18n";

// Two-click delete for the admin Orders table: first click arms it, second
// confirms. Avoids a native confirm() dialog and accidental deletes.
export default function DeleteOrderButton({ id, locale }) {
  const t = getAdminDict(locale);
  const [armed, setArmed] = useState(false);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!armed) {
      setArmed(true);
      return;
    }
    startTransition(async () => {
      await deleteOrder(id);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onBlur={() => setArmed(false)}
      disabled={pending}
      title={t.deleteOrder}
      className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-50 ${
        armed
          ? "border-red-500 bg-red-500/10 text-red-500"
          : "border-border text-muted hover:border-red-500 hover:text-red-500"
      }`}
    >
      {pending ? "…" : armed ? t.confirmDelete : t.del}
    </button>
  );
}
