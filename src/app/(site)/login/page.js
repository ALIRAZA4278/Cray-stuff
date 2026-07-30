import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "./LoginForm";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Sign in — CRAY STUFF",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  return (
    <AuthLayout
      eyebrow={t.pgLoginEyebrow}
      title={t.pgLoginTitle}
      subtitle={t.pgLoginSubtitle}
      alt={{ label: t.pgLoginAltLabel, href: "/register", cta: t.pgLoginAltCta }}
    >
      <LoginForm initialError={params?.error} />
    </AuthLayout>
  );
}
