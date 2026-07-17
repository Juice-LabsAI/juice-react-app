import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S13 — under the hood. Dark band: the site's dark treatment is the deep-purple
   panel (footer #601db4) with the Formats-style white dot texture. */
export default function UnderTheHood() {
  return (
    <section className="relative overflow-hidden bg-[#601db4] py-16 lg:py-[100px]">
      {/* sparkle / dot texture (Formats recipe) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.6px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-juice relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="max-w-[871px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-white">
            Trained on what actually makes creator content work.
          </h2>

          <div className="mt-8 max-w-[760px] font-display text-[20px] leading-[1.41] text-white">
            <p>
              Juice is tuned on high-performing creator campaigns across categories and geographies.
              It reads content style, watch behavior, audience composition, and sponsored
              performance, then filters against your brand voice, your category rules, and the
              metric you&rsquo;re actually chasing.
            </p>
            <p className="mt-6">
              The models are refined by teams that have shipped creator plans across CPG, D2C,
              beauty, food, and personal care. Every campaign that runs through Juice makes the next
              one sharper.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
