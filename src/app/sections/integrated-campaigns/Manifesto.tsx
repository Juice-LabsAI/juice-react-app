import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";
import boardVisual from "../../../imports/5Jun/hero-dashboard.png";

/* Manifesto band — the centerpiece. Full-bleed lavender dot-grid section
   (BriefCarousel band treatment) with hero-scale centered type, the three
   pillars as white cards, a full-bleed board visual, and a pull quote. */

const PILLARS = [
  {
    title: "Content",
    body: "carries the idea. The hook people forward. The meme they steal. The line they still repeat six months later.",
  },
  {
    title: "Creators",
    body: "carry the credibility. The category insiders, the everyday users, the ones who make it feel true instead of sold.",
  },
  {
    title: "Commerce",
    body: "carries the conversion. The PDP, the Amazon A+, the WhatsApp reminder, the shelf-facing static that closes the pack.",
  },
];

export default function Manifesto() {
  return (
    <section className="dot-grid overflow-hidden bg-[#f5f3ff] py-20 sm:py-24 lg:py-28">
      <div className="container-juice">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto max-w-[900px] text-center"
        >
          <h2 className="font-body text-[clamp(2.5rem,8vw,7.25rem)] font-extrabold leading-[0.9] tracking-[-0.02em] text-[#444]">
            Content. Creators. Commerce.
          </h2>
          <p className="mt-6 font-display text-[20px] font-medium leading-[1.41] text-[#444]">
            This is what integrated was supposed to mean.
          </p>
          <p className="mx-auto mt-10 max-w-[720px] font-display text-[16px] leading-[1.5] text-[#535353]">
            Three teams. Three timelines. Three tools. Three approvers. The same idea, chopped up so many
            times that by the time it hits the shelf, it doesn&rsquo;t look like the thing that got sold in
            the boardroom.
          </p>
          <p className="mt-4 font-body text-[clamp(1.375rem,2.4vw,2rem)] font-bold leading-[1.2] text-[#444]">
            Juice runs all three in one plan.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className="rounded-xl bg-white p-7 sm:p-8">
              <h3 className="font-body text-2xl font-semibold text-[#444]">{p.title}</h3>
              <p className="mt-3 font-display text-[16px] leading-[1.5] text-[#535353]">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* full-bleed board visual */}
        <motion.img
          src={boardVisual}
          alt="A Juice campaign board: one idea planned across content, creators, and commerce"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 w-full select-none rounded-xl"
          draggable={false}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto mt-12 max-w-[760px] text-center font-display text-[16px] leading-[1.5] text-[#535353]"
        >
          Most tools give you one of the three. A few give you two. Juice was built to plan all three off
          the same idea, tagged on the same board, so that when the campaign lands, the three teams are
          actually saying the same thing.
        </motion.p>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto mt-14 max-w-[720px] text-center"
        >
          <p className="font-body text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-[1.3] text-[#444]">
            &ldquo;First time our brand, performance, and D2C teams have looked at the same campaign
            board.&rdquo;
          </p>
          <cite className="mt-5 block font-display text-[15px] not-italic text-[#535353]">
            — VP Marketing, D2C beauty brand
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
