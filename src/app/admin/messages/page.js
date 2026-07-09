import AdminHeader from "@/components/admin/AdminHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Messages — Admin" };

// Always fetch fresh — this is an inbox.
export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
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

  return (
    <div>
      <AdminHeader
        eyebrow="Inbox"
        title="Messages"
        description="Customer messages from the contact form and product questions."
      />

      {tableMissing ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Setup needed</p>
          <h2 className="mt-2 text-xl font-semibold uppercase tracking-tight">Inbox not connected yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Run <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-xs">docs/supabase-schema.sql</code> in
            your Supabase SQL editor to create the messages table. Contact-form submissions will land here
            automatically.
          </p>
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-12 text-center">
          <h2 className="text-xl font-semibold uppercase tracking-tight">No messages yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            When a customer sends a message from the contact page, it appears here.
          </p>
        </div>
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
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
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
    </div>
  );
}
