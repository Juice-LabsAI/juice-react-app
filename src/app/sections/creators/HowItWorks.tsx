import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* S8 — how it works: brief to cast in four numbered steps. Hairline-divided
   columns after the d2c Steps treatment. Anchored (#how-it-works) so the hero's
   secondary CTA can scroll here. */

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Drop the brief.",
    body: "Objective, audience, market, product, voice. Or connect your Brand OS.",
  },
  {
    n: "02",
    title: "See the chemistry map.",
    body: "Creators sorted by category fit and audience overlap, each one paired with the idea Juice would pitch them specifically.",
  },
  {
    n: "03",
    title: "Build the cast.",
    body: "Balance reach, region, and role. Juice flags gaps. You approve the plan.",
  },
  {
    n: "04",
    title: "Generate the briefs.",
    body: "Every creator gets a brief written in their voice, with claims already tagged for legal, and formats sized for the platforms they post to most.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]"
        >
          Brief to cast in four steps.
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {STEPS.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="border-t border-[#e6e6e6] pt-6">
              <span className="font-body text-[32px] font-bold leading-[0.9] text-[#bfbfbf]">
                {s.n}
              </span>
              <h3 className="mt-5 font-body text-[clamp(1.5rem,2vw,2rem)] font-bold leading-[1.04] text-[#444]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[330px] font-display text-[16px] leading-[1.41] text-[#444]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
