import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  title: "Order History — CRAY STUFF",
};

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Orders will come from Supabase once checkout is wired to Stripe.
  const orders = [];

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
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
        ) : null}
      </div>
    </div>
  );
}
