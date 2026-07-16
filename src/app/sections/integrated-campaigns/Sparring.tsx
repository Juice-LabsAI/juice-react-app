import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* "A partner, not a prompt box" — split statement (Jam pattern) with a pull
   quote on the right column. */
export default function Sparring() {
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
            A partner, not a prompt box.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[640px]"
          >
            <div className="font-display text-[20px] leading-[1.41] text-[#444]">
              <p>
                Ask Juice to make the angle more Gen Z. To drop a segment. To rewrite the board around a
                launch date. To push back if the plan feels too safe.
              </p>
              <p className="mt-6">
                You&rsquo;re not typing prompts at a bot. You&rsquo;re working with something that has read
                the winning campaigns in your category, learned your brand, and knows what a real plan looks
                like.
              </p>
            </div>

            <blockquote className="mt-10 border-l-2 border-[#9165f5] pl-6">
              <p className="font-body text-[clamp(1.375rem,2.2vw,1.75rem)] font-semibold leading-[1.3] text-[#444]">
                &ldquo;I feel like I&rsquo;m sparring with a sharp creative mind, not another ChatGPT
                output.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
