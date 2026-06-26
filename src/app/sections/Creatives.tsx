import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";
import apple from "../../imports/5Jun/creatives/apple.png";
import basket from "../../imports/5Jun/creatives/basket.png";
import hands from "../../imports/5Jun/creatives/hands.png";

const CARDS = [
  { img: apple, label: "On Brand Creatives" },
  { img: basket, label: "Pack and Logo Fidelity" },
  { img: hands, label: "Creative Control" },
];

export default function Creatives() {
  return (
    <section className="relative z-10 -mt-4 rounded-t-[20px] bg-white pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.2] text-[#444]"
        >
          Generate On-Brand Creatives,
          <br />
          Consistently
        </motion.h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-[61px] lg:grid-cols-3"
        >
          {CARDS.map((c) => (
            <motion.div key={c.label} variants={fadeUp} className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-[14px] transition-transform duration-300 hover:-translate-y-1">
                <img
                  src={c.img}
                  alt={c.label}
                  className="aspect-[437/375] w-full object-cover"
                  draggable={false}
                />
              </div>
              <h3 className="font-body text-2xl font-medium text-[#444] sm:text-[28px]">
                {c.label}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
