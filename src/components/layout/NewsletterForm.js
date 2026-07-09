"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, null);

  return (
    <div className="w-full max-w-md">
      <form action={formAction} className="flex w-full gap-2">
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending || state?.success}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {state?.success ? "Subscribed" : pending ? "…" : "Subscribe"}
        </button>
      </form>
      {state?.error && <p className="mt-2 text-xs text-red-400">{state.error}</p>}
      {state?.success && <p className="mt-2 text-xs text-accent">You&apos;re on the list — watch your inbox.</p>}
    </div>
  );
}
