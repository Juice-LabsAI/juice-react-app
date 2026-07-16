import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* "Under the hood" — split brand statement (Jam pattern). */
export default function UnderHood() {
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
            Trained on the anatomy of winning campaigns.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[640px] font-display text-[20px] leading-[1.41] text-[#444]"
          >
            <p>
              Juice is tuned on high-performing campaigns across categories and geographies, with 80+
              signals per idea. It maps real conversations, cultural moments, and category memes, then
              filters them against your brand voice, your past work, and the metrics that actually matter
              to you.
            </p>
            <p className="mt-6 font-bold">
              The models are refined by teams that have won at Cannes and Effies. Every campaign that runs
              through Juice makes the next one smarter.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
