import { cookies } from "next/headers";
import Reveal from "@/components/motion/Reveal";
import AccentGlow from "@/components/motion/AccentGlow";
import SectionHeading from "@/components/home/SectionHeading";
import { getDict } from "@/lib/i18n";

export default async function ValueProps() {
  const t = getDict((await cookies()).get("site-locale")?.value || "en");

  const props = [
    {
      title: t.hmValue1Title,
      desc: t.hmValue1Desc,
    },
    {
      title: t.hmValue2Title,
      desc: t.hmValue2Desc,
    },
    {
      title: t.hmValue3Title,
      desc: t.hmValue3Desc,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border px-6 py-16">
      <AccentGlow />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.hmValueEyebrow} title={t.hmValueTitle} center />
        <div className="grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {props.map((prop, index) => (
            <Reveal key={prop.title} delay={index * 0.08} variant="scale" className="p-8">
              <p className="font-display text-4xl font-semibold text-accent/25">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-base font-semibold uppercase tracking-tight">{prop.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{prop.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
