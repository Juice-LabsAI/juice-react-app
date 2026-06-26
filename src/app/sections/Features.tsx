import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";
import f1 from "../../imports/5Jun/features/f1.svg";
import f2 from "../../imports/5Jun/features/f2.svg";
import f3 from "../../imports/5Jun/features/f3.svg";
import f4 from "../../imports/5Jun/features/f4.svg";
import f5 from "../../imports/5Jun/features/f5.svg";
import f6 from "../../imports/5Jun/features/f6.svg";
import f7 from "../../imports/5Jun/features/f7.svg";
import f8 from "../../imports/5Jun/features/f8.svg";

const FEATURES = [
  { icon: f1, title: "Anatomy of Effective ads", desc: "Fine-tuned on winning ads, stories, and persuasion patterns with 80+ signals per ad" },
  { icon: f2, title: "Culture & Conversation radar", desc: "Maps real conversations, cultural signals, memes & surfaces fertile territories" },
  { icon: f3, title: "Expert-in-the-loop Refinement", desc: "Models tuned with the taste, judgement and craft of experts who have won at Cannes, Effies and more" },
  { icon: f4, title: "Playbook & Creative control", desc: "Comprehensive ingestion and analysis of your brand guidelines, voice, tone & expression" },
  { icon: f5, title: "Continuous Learning Loop", desc: "Every idea is an experiment and every experiment makes the system smarter" },
  { icon: f6, title: "Crafted for Creative Jams", desc: "Fine-tuned on winning ads, stories, and persuasion patterns with 80+ signals per ad" },
  { icon: f7, title: "Brand Governance", desc: "Fine-tuned on winning ads, stories, and persuasion patterns with 80+ signals per ad" },
  { icon: f8, title: "IP Safety Checks", desc: "Fine-tuned on winning ads, stories, and persuasion patterns with 80+ signals per ad" },
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
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 lg:mt-[52px] lg:grid-cols-4"
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
