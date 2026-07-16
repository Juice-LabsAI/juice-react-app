import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* "How ideas actually spread" — grey band card (Stats pattern) holding the
   four-job card row (coloured card treatment from quick-ads Stats). */

const JOBS = [
  {
    bg: "#c8b0ff",
    title: "Seed",
    body: "Plant a belief before anyone’s watching for a pitch. Category truth-telling, dermatologist POVs, ingredient stories, quiet BTS.",
  },
  {
    bg: "#ffb189",
    title: "Spark",
    body: "The moment people notice. Hero films, launch drops, creator hooks, meme formats built to travel.",
  },
  {
    bg: "#ffe689",
    title: "Engage",
    body: "Turn noticing into sharing, arguing, and building on. Public challenges, UGC prompts, comment-first content, community loops.",
  },
  {
    bg: "#ab86ff",
    title: "Convert",
    body: "Close the loop, wherever it happens. PDPs, A+, retention DMs, refer-a-friend, the checkout-adjacent static.",
  },
];

export default function Spread() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <div className="overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]">
          {/* header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8"
          >
            <h2 className="max-w-[620px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
              Ideas don&rsquo;t move in straight lines anymore. Neither should your plan.
            </h2>
            <p className="max-w-[380px] font-display text-[16px] leading-[1.41] text-[#444]">
              The funnel diagram made sense when a 9pm TV spot did most of the work. Today an idea gets
              planted on a Reddit thread, borrowed by a creator you didn&rsquo;t hire, argued about on
              WhatsApp, and closed on a marketplace review someone screenshots three weeks later.
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 font-body text-[20px] font-semibold uppercase tracking-[0.4px] text-[#535353]"
          >
            Juice plans for how ideas actually travel. Every card carries one of four jobs.
          </motion.p>

          {/* four job cards */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4"
          >
            {JOBS.map((j) => (
              <motion.div
                key={j.title}
                variants={fadeUp}
                className="flex min-h-[232px] flex-col gap-5 rounded-[12px] px-7 py-9"
                style={{ backgroundColor: j.bg }}
              >
                <h3 className="font-body text-[32px] font-bold leading-[0.9] text-[#444]">{j.title}</h3>
                <p className="font-display text-[16px] font-medium leading-[1.41] text-[#444]">{j.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* closing statement */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-14 flex flex-col gap-8 lg:mt-20 lg:flex-row lg:gap-[90px]"
          >
            <p className="max-w-[243px] shrink-0 font-body text-[20px] uppercase leading-[1.24] tracking-[0.4px] text-[#535353]">
              Roles ricochet
            </p>
            <p className="max-w-[871px] font-body text-[clamp(1.5rem,2.6vw,36px)] font-semibold leading-[1.3] text-[#444]">
              A Spark meme can seed a new audience the second time it travels. A Convert PDP can become
              someone&rsquo;s first Spark on TikTok.{" "}
              <span className="font-extrabold">
                The board shows you where your idea might land, where it might start over, and where
                it&rsquo;s likely to ricochet.
              </span>{" "}
              On purpose, not by accident.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
