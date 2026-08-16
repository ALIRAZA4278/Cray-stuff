import { cookies } from "next/headers";
import LegalPage from "@/components/legal/LegalPage";
import { legalDoc } from "@/lib/legal";

export const metadata = { title: "Privacy Policy — CRAY STUFF" };

export default async function PrivacyPage() {
  const locale = (await cookies()).get("site-locale")?.value || "en";
  return <LegalPage doc={legalDoc(locale, "privacy")} />;
}
