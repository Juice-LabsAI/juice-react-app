import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* "Every format your campaign is going to need" — category rows of lavender
   pills (signal-pill treatment from quick-ads Signals). */

const GROUPS: { label: string; items: string[] }[] = [
  { label: "Video", items: ["TVCs", "YouTube pre-roll", "Bumpers", "Meta Reels", "Shorts", "TikTok"] },
  { label: "Static", items: ["Feed", "Story", "Print", "OOH", "Retail"] },
  { label: "Carousel", items: ["IG", "LinkedIn", "PDP explainers"] },
  { label: "Long form & threads", items: ["LinkedIn", "X", "Blog", "Email"] },
  { label: "Creator", items: ["Briefs", "Drop calendars", "UGC prompts", "Macro Lives"] },
  { label: "Interactive", items: ["AR filters", "Quizzes", "Chatbots", "Public challenges"] },
  { label: "Commerce", items: ["PDPs", "Amazon A+", "WhatsApp flows", "Retention DMs"] },
  { label: "Community", items: ["FB groups", "Superfan lists", "Referral loops"] },
];

export default function Formats() {
  return (
    <section className="bg-white pb-16 pt-4 lg:pb-[100px]">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-[620px] font-body text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.2] text-[#444]"
        >
          Every format your campaign is going to need.
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 flex flex-col divide-y divide-[#e6e6e6] border-y border-[#e6e6e6] lg:mt-[52px]"
        >
          {GROUPS.map((g) => (
            <motion.div
              key={g.label}
              variants={fadeUp}
              className="flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-8"
            >
              <h3 className="w-[220px] shrink-0 font-body text-[20px] font-semibold text-[#444]">
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-[10px]">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[12px] bg-[#f5f3ff] px-4 py-2 font-display text-[15px] font-medium text-[#444]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
