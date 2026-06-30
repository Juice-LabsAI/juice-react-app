import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";
import f1 from "../../imports/5Jun/features/f1.svg";
import f2 from "../../imports/5Jun/features/f2.svg";
import f3 from "../../imports/5Jun/features/f3.svg";
import f4 from "../../imports/5Jun/features/f4.svg";
import f5 from "../../imports/5Jun/features/f5.svg";
import f6 from "../../imports/5Jun/features/f6.svg";

const FEATURES = [
  { icon: f1, title: "Signal-Driven Concepts", desc: "Ideas built from real cultural and category signal, engineered to cut through the noise before a dollar is spent." },
  { icon: f2, title: "Creative Jamming", desc: "A shared space where teams create, craft, and riff on ideas together — not a one-shot generator." },
  { icon: f3, title: "Brand Playbook & Governance", desc: "Ingests your brand guidelines, voice, and visual expression so every output stays unmistakably on-brand." },
  { icon: f4, title: "Expert-in-the-Loop Refinement", desc: "Outputs shaped by the taste and judgment of creatives who’ve won at Cannes, Effies, and beyond." },
  { icon: f5, title: "Full-Funnel Campaigns", desc: "Cohesive strategy from insight to big idea to channel-specific creative, all crafted around the objective." },
  { icon: f6, title: "Creative Adaptation & Formats", desc: "Turn one concept into many — adapted across static, video, and every format your channels demand." },
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
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="flex max-w-[272px] flex-col gap-[22px]">
              <img src={f.icon} alt="" className="size-14 sm:size-[68px]" draggable={false} />
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
