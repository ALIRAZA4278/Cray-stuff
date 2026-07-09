import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import AnswerQuestionForm from "@/components/admin/AnswerQuestionForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAllQuestions } from "@/lib/qa";

export const metadata = { title: "Messages — Admin" };
export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminMessagesPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const messages = data || [];
  const tableMissing = Boolean(error);
  const questions = await getAllQuestions();

  return (
    <div>
      <AdminHeader eyebrow="Inbox" title="Messages" description="Product questions and contact-form messages." />

      {/* Product Q&A */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">Product questions</h2>
        {questions.length === 0 ? (
          <p className="text-sm text-muted">No product questions yet.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <article key={q.id} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] text-muted">on /product/{q.product_slug}</p>
                    <p className="mt-1 text-sm font-medium">{q.question}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      {(q.name || "—") + " · " + q.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={q.status} />
                    <span className="font-mono text-[11px] text-muted">{formatDate(q.created_at)}</span>
                  </div>
                </div>
                {q.answer ? (
                  <p className="mt-3 border-t border-border pt-3 text-sm text-muted">
                    <span className="text-accent">Answer:</span> {q.answer}
                  </p>
                ) : (
                  <AnswerQuestionForm id={q.id} slug={q.product_slug} />
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Contact messages */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted">Contact messages</h2>
        {tableMissing ? (
          <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Setup needed</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Run <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-xs">docs/supabase-schema.sql</code> to
              enable the contact inbox.
            </p>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-muted">No contact messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <article key={message.id} className="rounded-lg border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{message.name}</p>
                    <p className="font-mono text-[11px] text-muted">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={message.status || "new"} />
                    <span className="font-mono text-[11px] text-muted">{formatDate(message.created_at)}</span>
                  </div>
                </div>
                {message.subject && <p className="mt-3 text-sm font-medium">{message.subject}</p>}
                <p className="mt-1 text-sm leading-relaxed text-muted">{message.message}</p>
                <div className="mt-4 border-t border-border pt-4">
                  <a
                    href={`mailto:${message.email}`}
                    className="rounded-full border border-border px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
                  >
                    Reply by email
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
