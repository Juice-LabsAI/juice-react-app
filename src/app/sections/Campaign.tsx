import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUp, revealViewport } from "../lib/motion";
import { CampaignInput, ChevronIcon } from "../components/CampaignInput";
import bettyAnti from "../../imports/5Jun/templates/betty-anti.png";
import bettyMood from "../../imports/5Jun/templates/betty-mood.png";
import bettyTuesday from "../../imports/5Jun/templates/betty-tuesday.png";
import haagenFind from "../../imports/5Jun/templates/haagen-find.png";
import haagenMath from "../../imports/5Jun/templates/haagen-math.png";

const TEMPLATES = [
  {
    brand: "Betty Crocker",
    desc: "To encourage messy yet fun baking at home",
    imgs: [bettyAnti, bettyMood, bettyTuesday],
  },
  {
    brand: "Häagen-Dazs",
    desc: "To state that each flavour is unique to the person eating it",
    imgs: [haagenFind, haagenMath, bettyAnti],
  },
];

function TemplateCard({ t }: { t: (typeof TEMPLATES)[number] }) {
  return (
    <article className="flex shrink-0 snap-start flex-col gap-6 rounded-xl bg-white p-6">
      <div className="flex gap-2">
        {t.imgs.map((src, i) => (
          <div
            key={i}
            className="aspect-[220/272] w-[150px] shrink-0 overflow-hidden rounded-lg sm:w-[200px] lg:w-[220px]"
          >
            <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-[#6a6a6a]">
        <h3 className="font-body text-2xl font-medium">{t.brand}</h3>
        <p className="font-display text-base font-normal leading-relaxed">{t.desc}</p>
      </div>
    </article>
  );
}

export default function Campaign() {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 740, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="campaign" className="dot-grid bg-[#f5f3ff] py-20 sm:py-24">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="text-center font-body text-[clamp(1.875rem,5vw,3rem)] font-medium text-[#6a6a6a]"
        >
          Start your first campaign!
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-9"
        >
          <CampaignInput />
        </motion.div>

        {/* purple templates panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-16 overflow-hidden rounded-xl bg-[#9165f5] p-6 sm:mt-20 sm:p-10 lg:p-[52px]"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-body text-2xl font-medium text-white sm:text-[32px]">
              Juice campaign templates
            </h3>
            <div className="flex items-center gap-4 sm:gap-8">
              <button className="hidden rounded-full border border-white px-6 py-[15px] font-display text-base font-bold leading-none text-white transition hover:bg-white/10 sm:block">
                Browse All
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollBy(-1)}
                  aria-label="Previous templates"
                  className="grid size-11 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 sm:size-12"
                >
                  <ChevronIcon className="size-5 rotate-90" stroke="white" />
                </button>
                <button
                  onClick={() => scrollBy(1)}
                  aria-label="Next templates"
                  className="grid size-11 place-items-center rounded-full border border-white text-white transition hover:bg-white/10 sm:size-12"
                >
                  <ChevronIcon className="size-5 -rotate-90" stroke="white" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scroller}
            className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TEMPLATES.map((t) => (
              <TemplateCard key={t.brand} t={t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
