import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";
import { openWaitlist } from "../../../lib/waitlist";

/* S14 — final CTA band. Centered hero-scale H2, primary "Book a demo" (opens
   the waitlist popup like the footer's demo CTA) + secondary mailto. */
export default function FinalCTA() {
  return (
    <section className="bg-white py-20 text-center sm:py-24 lg:py-28">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="mx-auto max-w-[1000px] font-body text-[clamp(2.5rem,6.4vw,96px)] font-extrabold leading-[0.9] text-[#444]">
            Bring your brief.
            <br />
            Get your cast.
          </h2>

          <p className="mx-auto mt-8 max-w-[760px] font-body text-[clamp(1.25rem,2.2vw,32px)] font-medium leading-[1.2] text-[#444]">
            20 minutes. Your next launch. Chemistry first.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={openWaitlist}
              className="rounded-full bg-[#333] px-7 py-5 font-display text-[20px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Book a demo
            </button>
            <a
              href="mailto:fresh@juicelabs.ai"
              className="flex items-center gap-3 rounded-full border border-[#111112] py-2.5 pl-6 pr-2.5 font-display text-[16px] font-bold leading-none text-[#111112] transition-colors hover:bg-black/5"
            >
              fresh@juicelabs.ai
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#111112] text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7h10M7.8 2.8 12 7l-4.2 4.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
