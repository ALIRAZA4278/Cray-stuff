"use client";

import { useState } from "react";

export default function ProductQA() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!question.trim()) return;
    setSubmitted(true);
    setQuestion("");
  }

  return (
    <div>
      <h2 className="text-lg font-semibold uppercase tracking-tight">Questions</h2>
      <p className="mt-2 text-sm text-muted">No questions yet — be the first to ask about this piece.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about size, condition, shipping…"
          className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          Ask
        </button>
      </form>
      {submitted && (
        <p className="mt-3 text-sm text-accent">Question sent — we&apos;ll notify you when it&apos;s answered.</p>
      )}
    </div>
  );
}
