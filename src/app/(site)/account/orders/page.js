import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/motion/Reveal";
import StatusBadge from "@/components/admin/StatusBadge";
import { getOrdersByEmail } from "@/lib/orders";

export const metadata = {
  title: "Order History — CRAY STUFF",
};

export const dynamic = "force-dynamic";

const STEPS = ["New", "Paid", "Shipped", "Delivered"];

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function OrderTracker({ status }) {
  if (status === "Cancelled") {
    return (
      <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-red-300">Order cancelled</p>
    );
  }
  const current = Math.max(0, STEPS.indexOf(status));
  return (
    <div className="mt-5">
      <div className="flex gap-1">
        {STEPS.map((step, i) => (
          <div key={step} className={`h-1 flex-1 rounded-full ${i <= current ? "bg-accent" : "bg-border"}`} />
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {STEPS.map((step, i) => (
          <span
            key={step}
            className={`font-mono text-[9px] uppercase tracking-widest ${
              i <= current ? "text-foreground" : "text-muted"
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const orders = await getOrdersByEmail(user.email);

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link href="/account" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent">
            &larr; Account
          </Link>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Order History</h1>
          <p className="mt-2 text-sm text-muted">Track shipments and revisit everything you&apos;ve collected.</p>
        </Reveal>

        {orders.length === 0 ? (
          <Reveal delay={0.05}>
            <div className="mt-10 rounded-lg border border-dashed border-border bg-surface p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">No orders yet</p>
              <h2 className="mt-3 text-2xl font-semibold uppercase tracking-tight">Nothing collected — yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                Every piece is one-of-one. When you find one, your order and tracking will live here.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Browse the drop
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-10 space-y-5">
            {orders.map((order, index) => (
              <Reveal key={order.id} delay={index * 0.04}>
                <article className="rounded-lg border border-border bg-surface p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Order</p>
                      <p className="mt-1 font-mono text-sm">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={order.status} />
                      <p className="mt-2 font-mono text-[11px] text-muted">{formatDate(order.date)}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {order.items.map((item, i) => (
                      <li key={`${item.slug || item.name}-${i}`} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-mono text-muted">&euro;{item.price}</span>
                      </li>
                    ))}
                  </ul>

                  <OrderTracker status={order.status} />

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-muted">{order.carrier ? `via ${order.carrier}` : "Awaiting dispatch"}</span>
                    <span>
                      Total <span className="ml-1 font-mono font-medium">&euro;{order.total}</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
