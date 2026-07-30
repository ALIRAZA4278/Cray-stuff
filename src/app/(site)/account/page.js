import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import Reveal from "@/components/motion/Reveal";
import { signOut } from "@/lib/actions/auth";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Account — CRAY STUFF",
};

function formatDate(value, locale) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const locale = (await cookies()).get("site-locale")?.value || "en";
  const t = getDict(locale);

  const dashboardLinks = [
    {
      href: "/account/orders",
      title: t.pgAccountOrdersTitle,
      desc: t.pgAccountOrdersDesc,
    },
    {
      href: "/fire-list",
      title: t.pgAccountFireTitle,
      desc: t.pgAccountFireDesc,
    },
    {
      href: "/shop",
      title: t.pgAccountKeepTitle,
      desc: t.pgAccountKeepDesc,
    },
  ];

  const name = user.user_metadata?.name || user.email?.split("@")[0];

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgAccountEyebrow}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
              {t.pgAccountHey}, {name}
            </h1>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-border px-5 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
              >
                {t.pgAccountSignOut}
              </button>
            </form>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* Profile summary */}
          <Reveal>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.pgAccountProfile}</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">{t.pgAccountName}</dt>
                  <dd className="mt-1">{name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">{t.pgAccountEmail}</dt>
                  <dd className="mt-1 break-all">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">{t.pgAccountMemberSince}</dt>
                  <dd className="mt-1">{formatDate(user.created_at, locale)}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Dashboard links */}
          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col justify-between rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.desc}</p>
                  </div>
                  <span className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">
                    {t.pgAccountOpen}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
