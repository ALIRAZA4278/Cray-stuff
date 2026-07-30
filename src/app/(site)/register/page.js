import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "./RegisterForm";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Create account — CRAY STUFF",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  return (
    <AuthLayout
      eyebrow={t.pgRegisterEyebrow}
      title={t.pgRegisterTitle}
      subtitle={t.pgRegisterSubtitle}
      alt={{ label: t.pgRegisterAltLabel, href: "/login", cta: t.pgRegisterAltCta }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
