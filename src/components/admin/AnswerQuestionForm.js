"use client";

import { useState, useTransition } from "react";
import { answerQuestion } from "@/lib/actions/qa";

export default function AnswerQuestionForm({ id, slug }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  function submit(event) {
    event.preventDefault();
    if (!answer.trim()) return;
    setError(null);
    startTransition(async () => {
      const result = await answerQuestion(id, slug, answer);
      if (result?.error) setError(result.error);
      else setAnswer("");
    });
  }

  return (
    <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write an answer…"
        className="w-full rounded-lg border border-border bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        disabled={pending}
        className="shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Posting…" : "Reply"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
