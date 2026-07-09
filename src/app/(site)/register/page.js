import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Create account — CRAY STUFF",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/account");

  return (
    <AuthLayout
      eyebrow="Join the drop"
      title="Create account"
      subtitle="Save pieces to your Fire List and get first access to new drops."
      alt={{ label: "Already have an account?", href: "/login", cta: "Sign in" }}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
