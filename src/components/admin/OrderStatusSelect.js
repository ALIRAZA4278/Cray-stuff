"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/orders";

const STATUSES = ["New", "Paid", "Shipped", "Delivered", "Cancelled"];

// Inline status dropdown for the admin Orders table. Saves on change and
// revalidates so the customer's tracker updates too.
export default function OrderStatusSelect({ id, status }) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  function onChange(event) {
    const next = event.target.value;
    const previous = value;
    setValue(next);
    startTransition(async () => {
      const result = await updateOrderStatus(id, next);
      if (result?.error) setValue(previous); // revert on failure
    });
  }

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={pending}
      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground outline-none transition-colors hover:border-accent focus:border-accent disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
