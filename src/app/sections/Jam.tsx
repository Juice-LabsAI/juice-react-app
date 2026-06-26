import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../lib/motion";
import jamVisual from "../../imports/5Jun/jam-visual.png";

export default function Jam() {
  return (
    <section id="jam" className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-juice">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-12">
          {/* left: heading + subtext */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[420px] shrink-0 text-center lg:w-[300px] lg:text-left"
          >
            <h2 className="font-body text-[clamp(2rem,3.6vw,3.125rem)] font-medium leading-[1.18] tracking-[-0.02em] text-[#333]">
              Jam with ideas, don’t just generate
            </h2>
            <p className="mt-7 font-display text-xl leading-[1.32] text-[#111112] sm:text-2xl">
              Remix, refine and riff on ideas until they hit the sweet spot
            </p>
          </motion.div>

          {/* right: stacked citrus + "Create. Iterate. Inspire. Mutate. Jam." (one image
              so the slices and words stay aligned exactly as designed) */}
          <motion.img
            src={jamVisual}
            alt="Create. Iterate. Inspire. Mutate. Jam. — beside a balanced stack of citrus slices"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[480px] select-none sm:max-w-[600px] lg:w-[clamp(420px,50vw,750px)] lg:max-w-none lg:shrink-0"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
