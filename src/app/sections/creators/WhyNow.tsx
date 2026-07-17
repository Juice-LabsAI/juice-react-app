import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S10 — why this matters now. Short prose, no graphic. */
export default function WhyNow() {
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
            The category has moved past discovery tools.
          </h2>

          <div className="mt-8 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444]">
            <p>
              Creator marketing used to be a search problem. You needed to find the right names.
              Discovery tools solved that a long time ago, and most brands still overpay for the ones
              with the biggest lists.
            </p>
            <p className="mt-6">
              The problem now is a planning problem. Chemistry between brand, creator, and idea.
              Ensemble casting across reach and region. Sequencing so the wave has a shape.
              Compliance without killing the timing. Metrics that ladder up to a campaign, not a
              post.
            </p>
            <p className="mt-6 font-bold">Juice was built for that shift.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
