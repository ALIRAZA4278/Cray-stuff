import Reveal from "@/components/motion/Reveal";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — CRAY STUFF",
};

const details = [
  { label: "Email", value: "hello@craystuff.com" },
  { label: "Response time", value: "Within 24 hours" },
  { label: "Based in", value: "Warsaw, Poland — shipping worldwide" },
];

export default function ContactPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Get in touch</p>
          <h1 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">Contact</h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Questions about a piece, an offer, or an order? Message us directly — every piece is curated by hand, and so
            is every reply.
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
