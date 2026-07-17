import { Link } from "react-router";
import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S11 — Content · Creators · Commerce callback. Centered, three chips echoing
   the landing page's CONTENT/CREATORS/COMMERCE labels, plus a link back to "/". */

const CHIPS = ["Content", "Creators", "Commerce"];

export default function Engine() {
  return (
    <section className="bg-white py-16 text-center lg:py-[100px]">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
            One engine of three.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-[12px] bg-[#f5f3ff] px-5 py-2.5 font-body text-[16px] font-semibold uppercase leading-[1.05] tracking-[0.04em] text-[#444] sm:text-xl"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444]">
            <p>
              Content carries the idea. Creators carry the credibility. Commerce carries the
              conversion. Creator planning that ignores the other two ends up funding beautiful posts
              that don&rsquo;t compound.
            </p>
            <p className="mt-6">
              Juice plans your creator layer inside the campaign it&rsquo;s meant to serve, so the
              unboxing has a PDP behind it, the demo has a retention DM behind it, and the meme has
              an idea worth spreading behind all of them.
            </p>
          </div>

          <Link
            to="/"
            className="mt-10 inline-block font-display text-[18px] font-bold text-[#444] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            See how Content, Creators, and Commerce fit together &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
