import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* S5 — how creator ideas actually spread. Five-stage cascade/wave graphic
   (built in code from contract tokens): the shape of the wave, not a calendar.
   Columns on sm+, stacked horizontal bars on mobile. */

const STAGES: {
  n: string;
  label: string;
  height: string;
  width: string;
  bg: string;
  dark: boolean;
  numLight: boolean;
}[] = [
  { n: "01", label: "Unboxing plants it", height: "96px", width: "40%", bg: "#ede9ff", dark: false, numLight: false },
  { n: "02", label: "Specialist gives it teeth", height: "150px", width: "52%", bg: "#c8b0ff", dark: false, numLight: false },
  { n: "03", label: "Regional translates", height: "208px", width: "72%", bg: "#ab86ff", dark: false, numLight: true },
  { n: "04", label: "Memes flatten it", height: "170px", width: "60%", bg: "#9165f5", dark: true, numLight: true },
  { n: "05", label: "Superfan closes it", height: "124px", width: "46%", bg: "#8656f4", dark: true, numLight: true },
];

export default function Cascade() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="max-w-[871px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
            One creator lights the fire. Twenty creators keep it lit.
          </h2>

          <div className="mt-8 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444]">
            <p>
              A single creator post rarely does the whole job. What moves a category is the shape of
              the wave.
            </p>
            <p className="mt-6">
              The unboxing creates the artifact. A specialist backs up the claim. Regional creators
              translate it into languages the algorithm hadn&rsquo;t been fed. Meme accounts flatten
              it into a format other people copy for free. A superfan creator lands the retention
              hook eight weeks later.
            </p>
          </div>
        </motion.div>

        {/* wave — columns on sm+ */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 hidden grid-cols-5 items-end gap-2 sm:grid lg:mt-16 lg:gap-3"
          aria-hidden
        >
          {STAGES.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex flex-col justify-end">
              <div
                className="flex flex-col justify-end gap-1 rounded-t-[12px] px-4 pb-4"
                style={{ height: s.height, backgroundColor: s.bg }}
              >
                <span
                  className={`font-body text-[13px] font-bold ${s.numLight ? "text-white/70" : "text-[#9a9a9a]"}`}
                >
                  {s.n}
                </span>
                <span
                  className={`font-display text-[14px] font-medium leading-[1.2] lg:text-[16px] ${
                    s.dark ? "text-white" : "text-[#444]"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* wave — stacked bars on mobile */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-10 flex flex-col gap-2 sm:hidden"
          aria-hidden
        >
          {STAGES.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex items-center gap-3">
              <div
                className="flex h-11 shrink-0 items-center rounded-[8px] px-3"
                style={{ width: s.width, backgroundColor: s.bg }}
              >
                <span
                  className={`font-body text-[12px] font-bold ${s.numLight ? "text-white/70" : "text-[#9a9a9a]"}`}
                >
                  {s.n}
                </span>
              </div>
              <span className="min-w-0 font-display text-[14px] leading-[1.2] text-[#444]">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444] lg:mt-16"
        >
          <p>
            Juice stages the cast so each creator is doing the job the previous one set up. The board
            shows you the sequence, not the post calendar. Which creator plants the idea. Which one
            gives it teeth. Which one moves it into a new region. Which one closes the argument on
            the PDP.
          </p>
          <p className="mt-6 font-bold">
            Most tools give you a launch date and a batch. Juice gives you a cascade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
