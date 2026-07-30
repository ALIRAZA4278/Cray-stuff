import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "./ContactForm";
import { getDict } from "@/lib/i18n";

export const metadata = {
  title: "Contact — CRAY STUFF",
};

export default async function ContactPage() {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  const details = [
    { label: t.pgContactLabelEmail, value: "hello@craystuff.com" },
    { label: t.pgContactLabelResponse, value: t.pgContactValueResponse },
    { label: t.pgContactLabelBased, value: t.pgContactValueBased },
  ];

  return (
    <div className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.pgContactEyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">{t.pgContactTitle}</h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {t.pgContactIntro}
          </p>

          <dl className="mt-10 space-y-6">
            {details.map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">{item.label}</dt>
                <dd className="mt-1 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.05}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
