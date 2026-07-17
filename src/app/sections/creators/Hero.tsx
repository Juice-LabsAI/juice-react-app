import { motion, useReducedMotion } from "motion/react";
import { openWaitlist } from "../../../lib/waitlist";

/* Creators hero — centered, text-led (approved wireframe S1). Eyebrow + H1 +
   subhead + two CTAs + three trust chips. No hero media. "Book a demo" opens
   the waitlist popup (same mechanism as the footer's "Get a Demo"); the
   secondary CTA anchors down to the how-it-works section. */

const TRUST_CHIPS = [
  "Trained on 100k+ creator campaigns across categories",
  "Reads audience overlap, watch behavior, sponsored performance",
  "Loads your Brand OS so briefs ship compliant on the first pass",
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-[120px] pb-16 text-center sm:pt-[140px] lg:pb-20">
      <div className="container-juice">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-[20px] uppercase leading-[1.24] tracking-[0.4px] text-[#535353]">
            Creators
          </p>

          <h1 className="mx-auto mt-5 max-w-[1000px] font-body text-[clamp(2.75rem,5.8vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.01em] text-[#444]">
            Not a creator list.
            <br />
            A cohesive creator plan.
          </h1>

          <p className="mx-auto mt-8 max-w-[780px] font-display text-[20px] leading-[1.41] text-[#444]">
            Juice matches your brand with the right creators, writes ideas that fit both sides, and
            stages the cast across reach, region, and format. What used to be a spreadsheet of names
            becomes a plan you can defend to marketing, legal, and finance in the same meeting.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={openWaitlist}
              className="rounded-full bg-[#333] px-6 py-[15px] font-display text-[16px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Book a demo
            </button>
            <a
              href="#how-it-works"
              className="flex items-center gap-3 rounded-full border border-[#111112] py-1.5 pl-5 pr-1.5 font-display text-[16px] font-bold leading-none text-[#111112] transition-colors hover:bg-black/5"
            >
              See it on your brief
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#111112] text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 2v10M2.8 7.8 7 12l4.2-4.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {TRUST_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-[12px] bg-[#f5f3ff] px-4 py-2 font-display text-[14px] leading-[1.05] text-[#444] sm:text-[16px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
