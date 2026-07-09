"use client";

import { useTransition } from "react";
import { decideOffer } from "@/lib/actions/offers";

export default function OfferActions({ id }) {
  const [pending, startTransition] = useTransition();

  function decide(decision) {
    startTransition(async () => {
      await decideOffer(id, decision);
    });
  }

  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => decide("accept")}
        className="rounded-full border border-emerald-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500/10 disabled:opacity-50"
      >
        Accept
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => decide("decline")}
        className="rounded-full border border-red-500/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
      >
        Decline
      </button>
    </div>
  );
}
