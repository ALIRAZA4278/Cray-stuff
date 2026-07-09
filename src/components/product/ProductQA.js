"use client";

import { useActionState } from "react";
import Link from "next/link";
import { askQuestion } from "@/lib/actions/qa";
import { useAuth } from "@/lib/AuthContext";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent";

export default function ProductQA({ slug, questions = [] }) {
  const [state, formAction, pending] = useActionState(askQuestion, null);
  const { user } = useAuth();
  const answered = questions.filter((q) => q.answer);

  return (
    <div>
      <h2 className="text-lg font-semibold uppercase tracking-tight">Questions</h2>

      {answered.length === 0 ? (
        <p className="mt-2 text-sm text-muted">No questions yet — be the first to ask about this piece.</p>
      ) : (
        <ul className="mt-4 space-y-5">
          {answered.map((q) => (
            <li key={q.id} className="border-b border-border pb-5 last:border-0">
              <p className="text-sm font-medium">Q: {q.question}</p>
              <p className="mt-1.5 text-sm text-muted">
                <span className="text-accent">A:</span> {q.answer}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!user ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-4 text-sm text-muted">
          <Link href="/login" className="text-accent hover:opacity-80">
            Log in
          </Link>{" "}
          to ask a question about this piece.
        </div>
      ) : (
      <form action={formAction} className="mt-6 space-y-3">
        <input type="hidden" name="slug" value={slug} />
        <textarea
          name="question"
          required
          rows={2}
          placeholder="Ask about size, condition, shipping…"
          className={`${inputClass} resize-none`}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input type="email" name="email" required placeholder="Your email" className={inputClass} autoComplete="email" />
          <button
            type="submit"
            disabled={pending}
            className="shrink-0 rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent disabled:opacity-50"
          >
            {pending ? "Sending…" : "Ask"}
          </button>
        </div>
        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state?.success && (
          <p className="text-sm text-accent">Question sent — we&apos;ll email you when it&apos;s answered.</p>
        )}
      </form>
      )}
    </div>
  );
}
