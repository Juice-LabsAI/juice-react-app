import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S9 — what comes out. Outputs checklist inside a grey rounded panel. */

const OUTPUTS = [
  "The cast, tagged by role and stage",
  "A shot list per creator, written to their content style",
  "Region and language mix, mapped against reach",
  "Compliance flags per claim, pre-loaded per category",
  "Metrics per creator, rolled up to a campaign KPI",
  "The paid amplification cut, so the best organic creator posts don’t stay organic",
];

export default function Outputs() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <div className="overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[871px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]"
          >
            A creator plan you can walk into any room with.
          </motion.h2>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 max-w-[871px] divide-y divide-black/10 lg:mt-14"
          >
            {OUTPUTS.map((item) => (
              <li key={item} className="flex items-center gap-4 py-5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#333] text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12.5 10 17.5 19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="font-display text-[16px] font-medium leading-[1.41] text-[#444] sm:text-[20px]">
                  {item}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
