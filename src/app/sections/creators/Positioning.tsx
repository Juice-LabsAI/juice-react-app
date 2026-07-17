import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S2 — positioning. Narrow prose column, no graphic; sets up the two
   centerpieces that follow. */
export default function Positioning() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-[871px]"
        >
          <h2 className="font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
            Most brands don&rsquo;t have a creator plan. They have a creator list.
          </h2>

          <p className="mt-8 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444]">
            A spreadsheet. Some macro names the agency knew. A few micros the intern found. One
            big-ticket signing that ate half the budget. The brief goes out. Content comes back. Some
            of it looks like the brand paid for it. Some of it flies. Nobody can tell why. Nobody can
            repeat it.
          </p>
          <p className="mt-6 max-w-[760px] font-display text-[20px] font-bold leading-[1.41] text-[#444]">
            The problem isn&rsquo;t the creators. It&rsquo;s that no one is planning them like a
            campaign.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
