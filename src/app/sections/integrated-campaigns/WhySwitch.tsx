import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* "Why teams switch" — grey dot-grid display card (AgenticTeam pattern):
   giant display statement + supporting copy. */
export default function WhySwitch() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container-juice">
        <div className="dot-grid relative overflow-hidden rounded-[28px] bg-[#f6f6f6] px-6 py-14 sm:px-12 sm:py-16 lg:px-[52px] lg:py-[90px]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="relative z-10"
          >
            <h2 className="max-w-[16ch] font-body text-[clamp(2.25rem,5.6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#444]">
              Variation reveals. Optimisation scales. In that order.
            </h2>
            <div className="mt-8 max-w-[640px] font-display text-[18px] font-medium leading-[1.41] text-[#444]">
              <p>
                Most AI ad tools return variations of an asset. Twelve versions of the same static. Six
                ways to phrase the same line.
              </p>
              <p className="mt-5">
                Juice returns variations of the bet. Different reasons to care. Different roles for the
                brand. Different moments where the brand can matter. That&rsquo;s the part that decides
                whether the campaign actually moves anything.
              </p>
              <p className="mt-5 font-bold">Once you know which bet is working, then you scale.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
