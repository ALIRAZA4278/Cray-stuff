import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "./LoginForm";

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

  return (
    <AuthLayout
      eyebrow="Members"
      title="Welcome back"
      subtitle="Sign in to your Fire List, offers and order history."
      alt={{ label: "New here?", href: "/register", cta: "Create an account" }}
    >
      <LoginForm initialError={params?.error} />
    </AuthLayout>
  );
}
