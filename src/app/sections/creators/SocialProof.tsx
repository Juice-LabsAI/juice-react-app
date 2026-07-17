import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* S12 — social proof: three quote cards on the lavender panel recipe. */

const QUOTES: { quote: string; attr: string }[] = [
  {
    quote:
      "The first creator brief we’ve sent out where the creator sent back a ‘yes, exactly’ instead of a counter-brief.",
    attr: "Head of Brand, D2C beauty",
  },
  {
    quote:
      "We used to build creator plans in three tabs and a WhatsApp group. Now it’s one board, and the paid team can see it too.",
    attr: "Growth Lead, personal care brand",
  },
  {
    quote: "Legal cleared the whole cast in one review. That has never happened before.",
    attr: "Marketing Director, CPG",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {QUOTES.map(({ quote, attr }) => (
            <motion.figure
              key={attr}
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 rounded-[12px] bg-[#f5f3ff] p-8"
            >
              <blockquote className="font-display text-[20px] font-medium leading-[1.41] text-[#444]">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="font-display text-[14px] text-[#535353]">
                &mdash; {attr}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
