import { motion } from "motion/react";
import { Radar, Users, ShieldCheck, Award, Filter, Layers, type LucideIcon } from "lucide-react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";

// Each feature keeps the original purple-circle badge and its own decorative
// squiggle; only the glyph changes to one that resonates with the point.
const FEATURES: { Icon: LucideIcon; squiggle: string; title: string; desc: string }[] = [
  {
    Icon: Radar,
    squiggle: "M-15 61.5876C-3.83716 51.5106 4 20.5874 40.1428 53.652C59.3062 71.1834 44.6428 4.08787 26.5 11.5876C19.2507 14.5842 10.5311 41.5328 102 50.0862",
    title: "Signal-Driven Concepts",
    desc: "Ideas built from real cultural and category signal, engineered to cut through the noise before a dollar is spent.",
  },
  {
    Icon: Users,
    squiggle: "M-15 64.5875C-3.83716 54.5105 5.5 15.9995 41 17.9995C65.9957 19.4076 30.7259 21.3532 21.8782 48.3592C21.5715 49.2955 22.6893 49.9945 23.4694 49.3928C31.2901 43.3596 48.9726 36.0759 102 53.0861",
    title: "Creative Jamming",
    desc: "A shared space where teams create, craft, and riff on ideas together — not a one-shot generator.",
  },
  {
    Icon: ShieldCheck,
    squiggle: "M-15 58.5884C-3.83716 48.5114 -0.814829 -8.79934 19 35.9995C42 87.9997 57 6.49951 38.315 13.9127C31.0236 16.8055 26 77.4131 86.5 44.9997",
    title: "Brand Playbook & Governance",
    desc: "Ingests your brand guidelines, voice, and visual expression so every output stays unmistakably on-brand.",
  },
  {
    Icon: Award,
    squiggle: "M-6.50024 72C-14.0001 44.5 34.4998 2.99953 51.9999 45.4995C61.1538 67.7303 -1.50055 36.9995 52 -6.00047",
    title: "Expert-in-the-Loop Refinement",
    desc: "Outputs shaped by the taste and judgment of creatives who’ve won at Cannes, Effies, and beyond.",
  },
  {
    Icon: Filter,
    squiggle: "M-15 61.5874C-4.92373 52.4913 10.0671 32.8756 39.4725 53.4617C41.3445 54.7722 43.9631 52.5349 42.757 50.5939C34.8888 37.9323 24.7394 21.1673 28 18.4995C33.5 13.9995 53.5 44.9995 83.5 16.4995",
    title: "Full-Funnel Campaigns",
    desc: "Cohesive strategy from insight to big idea to channel-specific creative, all crafted around the objective.",
  },
  {
    Icon: Layers,
    squiggle: "M-21 95.4997C-9.83716 85.4228 26.8572 28.4351 63 61.4997C82.1635 79.0311 37 -6.50029 20 12.4997C14.7695 18.3456 30.5 45.8317 98.5 2.49971",
    title: "Creative Adaptation & Formats",
    desc: "Turn one concept into many — adapted across static, video, and every format your channels demand.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white pb-24 pt-4 sm:pb-28">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium text-[#444]"
        >
          Juice features
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 lg:mt-[52px] lg:grid-cols-3"
        >
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} className="flex max-w-[272px] flex-col gap-[22px]">
              <div className="relative flex size-14 shrink-0 items-center justify-center sm:size-[68px]">
                <svg viewBox="0 0 68 68" className="absolute inset-0 size-full" aria-hidden="true">
                  <clipPath id={`feat-clip-${i}`}>
                    <rect width="68" height="68" rx="34" />
                  </clipPath>
                  <g clipPath={`url(#feat-clip-${i})`}>
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
