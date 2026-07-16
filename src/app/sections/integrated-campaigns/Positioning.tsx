import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* Positioning — split brand statement (Jam pattern): heading left, prose right. */
export default function Positioning() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <div className="container-juice">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[480px] shrink-0 font-body text-[clamp(2rem,3.6vw,3.125rem)] font-medium leading-[1.18] tracking-[-0.02em] text-[#333] lg:w-[440px]"
          >
            Most &ldquo;integrated&rdquo; campaigns aren&rsquo;t. They&rsquo;re assembled.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[640px] font-display text-[20px] leading-[1.41] text-[#444]"
          >
            <p>
              A hero film in one room. A performance set in another. A creator brief sitting on
              someone&rsquo;s desktop. A PDP update in a doc no one has opened this week. Three weeks later
              the campaign ships, and the story has already drifted.
            </p>
            <p className="mt-6">
              Integrated used to mean everything ran with the same font. That was enough when a TVC did
              most of the work. It isn&rsquo;t now.
            </p>
            <p className="mt-6 font-bold">
              Juice plans the whole campaign as one thing. One core bet, sequenced across everywhere the
              idea has to travel, one click from asset.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
