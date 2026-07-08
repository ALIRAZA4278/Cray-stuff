import Reveal from "@/components/motion/Reveal";
import BrandStory from "@/components/home/BrandStory";
import DropCountdown from "@/components/home/DropCountdown";

export default function PhilosophyAndDrop({ dropTarget }) {
  return (
    <section className="border-b border-border px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
        <Reveal>
          <BrandStory />
        </Reveal>
        <Reveal delay={0.1}>
          <DropCountdown target={dropTarget} />
        </Reveal>
      </div>
    </section>
  );
}
