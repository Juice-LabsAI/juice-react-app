import { motion } from "motion/react";
import { Compass, BadgeCheck, Layers, Users, MousePointerClick, type LucideIcon } from "lucide-react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* "What comes out" — icon feature grid (Features pattern): purple circle
   badges with squiggles, title + description. Squiggle paths reuse the
   landing Features set (same decorative system). */

const ITEMS: { Icon: LucideIcon; squiggle: string; title: string; desc: string }[] = [
  {
    Icon: Compass,
    squiggle: "M-15 61.5876C-3.83716 51.5106 4 20.5874 40.1428 53.652C59.3062 71.1834 44.6428 4.08787 26.5 11.5876C19.2507 14.5842 10.5311 41.5328 102 50.0862",
    title: "Strategic angles, not just variations",
    desc: "Juice returns three or four ways to attack the brief, each a different reason for the category to care. You pick the bet you’ll back.",
  },
  {
    Icon: BadgeCheck,
    squiggle: "M-15 64.5875C-3.83716 54.5105 5.5 15.9995 41 17.9995C65.9957 19.4076 30.7259 21.3532 21.8782 48.3592C21.5715 49.2955 22.6893 49.9945 23.4694 49.3928C31.2901 43.3596 48.9726 36.0759 102 53.0861",
    title: "Every card has a job",
    desc: "Plant a belief. Spark attention. Keep the argument going. Close the sale. No orphan assets.",
  },
  {
    Icon: Layers,
    squiggle: "M-15 58.5884C-3.83716 48.5114 -0.814829 -8.79934 19 35.9995C42 87.9997 57 6.49951 38.315 13.9127C31.0236 16.8055 26 77.4131 86.5 44.9997",
    title: "20+ pieces per campaign",
    desc: "Reels, statics, carousels, threads, AR filters, quizzes, chatbots, creator drops, PDPs, WhatsApp DMs. All off the same idea.",
  },
  {
    Icon: Users,
    squiggle: "M-6.50024 72C-14.0001 44.5 34.4998 2.99953 51.9999 45.4995C61.1538 67.7303 -1.50055 36.9995 52 -6.00047",
    title: "Audience-aware storylines",
    desc: "The version for College Girls doesn’t scroll like the one for Moms. Each card is written for the segment it’s for.",
  },
  {
    Icon: MousePointerClick,
    squiggle: "M-15 61.5874C-4.92373 52.4913 10.0671 32.8756 39.4725 53.4617C41.3445 54.7722 43.9631 52.5349 42.757 50.5939C34.8888 37.9323 24.7394 21.1673 28 18.4995C33.5 13.9995 53.5 44.9995 83.5 16.4995",
    title: "One click from asset",
    desc: "Click any card, get the script, the static, the carousel, the brief, the PDP copy. Refine in the canvas. Push to production.",
  },
];

export default function Outcomes() {
  return (
    <section className="bg-white pb-24 pt-20 sm:pb-28 sm:pt-24">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.2] text-[#444]">
            A brief goes in. A campaign board comes out.
          </h2>
          <p className="mt-4 font-display text-[20px] font-medium leading-[1.41] text-[#444]">
            Not a moodboard. A plan you can walk your team through on a Monday.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 lg:mt-[52px] lg:grid-cols-3"
        >
          {ITEMS.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} className="flex max-w-[272px] flex-col gap-[22px]">
              <div className="relative flex size-14 shrink-0 items-center justify-center sm:size-[68px]">
                <svg viewBox="0 0 68 68" className="absolute inset-0 size-full" aria-hidden="true">
                  <clipPath id={`ic-out-clip-${i}`}>
                    <rect width="68" height="68" rx="34" />
                  </clipPath>
                  <g clipPath={`url(#ic-out-clip-${i})`}>
                    <rect width="68" height="68" rx="34" fill="#8656F4" />
                    <path d={f.squiggle} stroke="#9165F5" strokeWidth="8" fill="none" />
                  </g>
                </svg>
                <f.Icon className="relative size-[46%] text-white" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2 text-[#444]">
                <h3 className="font-body text-lg font-semibold leading-tight sm:text-xl">{f.title}</h3>
                <p className="font-display text-sm leading-relaxed text-[#444]/85">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
