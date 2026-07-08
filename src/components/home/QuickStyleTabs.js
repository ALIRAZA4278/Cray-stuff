import Reveal from "@/components/motion/Reveal";
import StyleFilterRow from "@/components/shop/StyleFilterRow";

export default function QuickStyleTabs() {
  return (
    <section className="border-b border-border px-6 py-4">
      <Reveal className="flex flex-wrap items-center justify-center gap-2">
        <StyleFilterRow currentStyle={null} />
      </Reveal>
    </section>
  );
}
