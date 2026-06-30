import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../lib/motion";
import onbrand1 from "../../imports/5Jun/creatives/onbrand-1.png";
import onbrand2 from "../../imports/5Jun/creatives/onbrand-2.png";
import onbrand3 from "../../imports/5Jun/creatives/onbrand-3.png";

const CARDS = [
  // image 1 is square — fill the width (no side gaps) and crop only from the bottom
  { img: onbrand1, label: "On Brand Creatives", fit: "object-cover object-top" },
  { img: onbrand2, label: "Pack and Logo Fidelity", fit: "object-cover" },
  // image 3 is a wide UI shot — crop to just past the left sidebar so the creative
  // preview (the "Fake 8 hours of sleep" frame) is fully visible, navbar hidden
  { img: onbrand3, label: "Creative Control", fit: "object-cover object-[13%_center]" },
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
                  className={`aspect-[437/375] w-full ${c.fit}`}
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
