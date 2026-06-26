import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";

const PARTS = [
  {
    num: "1",
    title: "Brand OS",
    subtitle: "( AI Platform )",
    items: ["Ad Campaigns", "Creator Campaigns", "Commerce Content", "Packaging Design", "Concept Generation"],
    engagement: "Self-Serve Platform Subscription",
  },
  {
    num: "2",
    title: "AI Studio",
    subtitle: "( Human in the loop services )",
    items: ["End to End Campaign execution", "Production Ready Videos", "Image Editing / Correction", "Other Studio Services"],
    engagement: "Retainer or Rate-card",
  },
];

function Part({ part }: { part: (typeof PARTS)[number] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative flex min-h-[560px] flex-col overflow-hidden rounded-xl bg-[#f5f3ff] p-7 sm:p-10 lg:min-h-[694px] lg:p-12"
    >
      {/* giant watermark number — middle-right, aligned with the list */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[32%] font-display text-[clamp(150px,17vw,242px)] font-bold leading-[0.9] text-[#ebe8fb]"
      >
        {part.num}
      </span>

      {/* title + subtitle + list */}
      <div className="relative z-10">
        <h3 className="font-body text-[clamp(2.75rem,5.2vw,4.375rem)] font-extrabold leading-[0.9] text-[#444]">
          {part.title}
        </h3>
        <p className="mt-3.5 font-display text-[clamp(1.25rem,2.4vw,2rem)] text-[#333]">{part.subtitle}</p>

        <ol className="mt-12 flex flex-col gap-4 font-display text-lg font-medium text-[#535353] sm:text-xl">
          {part.items.map((it, i) => (
            <li key={it} className="flex gap-3.5">
              <span>{i + 1}.</span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* engagement model */}
      <div className="relative z-10 mt-auto pt-10">
        <div className="flex flex-col gap-3.5 rounded-xl bg-[#ab86ff] p-6 text-white">
          <p className="font-display text-lg sm:text-xl">Engagement Model:</p>
          <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.23]">{part.engagement}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TwoParts() {
  return (
    <section id="twoparts" className="bg-white py-20 sm:py-24">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium text-[#444]"
        >
          One system, two parts
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2"
        >
          {PARTS.map((p) => (
            <Part key={p.num} part={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
