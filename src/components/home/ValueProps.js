import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const props = [
  {
    title: "Hand-picked & authenticated",
    desc: "Every piece is personally sourced and checked before it's listed — no dropshipping, no guesswork.",
  },
  {
    title: "One-of-one, never restocked",
    desc: "Once a piece sells, it's gone for good. What you see is the only one that will ever exist.",
  },
  {
    title: "Poland-first, worldwide shipping",
    desc: "Fast local delivery via InPost, Orlen Paczka, GLS and DPD — with shipping available globally too.",
  },
];

export default function ValueProps() {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Why CRAY STUFF" title="The difference" center />
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
