"use client";

import { motion } from "motion/react";

// Giant Ochi-style scrolling statement. A huge line of text loops horizontally
// on an accent panel with a rounded top edge, so the section below feels like
// it slides up over the one above.
export default function StatementMarquee({ text = "Wear Something Different" }) {
  const phrase = `${text} — `;

  return (
    <section className="-mt-6 overflow-hidden rounded-t-[2rem] bg-accent py-10 md:py-16">
      <div className="flex whitespace-nowrap border-y-2 border-accent-foreground/30">
        {[0, 1, 2].map((i) => (
          <motion.h2
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 14 }}
            className="pr-6 font-display text-[13vw] font-semibold uppercase leading-none tracking-tight text-accent-foreground"
          >
            {phrase}
          </motion.h2>
        ))}
      </div>
    </section>
  );
}
