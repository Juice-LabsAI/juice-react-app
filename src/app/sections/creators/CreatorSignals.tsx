import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* S7 — what Juice actually knows about creators. Eight signal cards in a
   responsive 4/2/1 grid, closed by a statement line. */

const SIGNALS: { title: string; body: string }[] = [
  {
    title: "Category affinity of the audience.",
    body: "Whether the followers are people who buy your category, or just people who like the topic. These are not the same thing.",
  },
  {
    title: "Comment-to-view quality.",
    body: "Ten thoughtful questions in the comments outperform a thousand fire emojis. Juice reads the difference.",
  },
  {
    title: "Save and forward rates.",
    body: "The two metrics that predict whether a piece of creator content has a second life.",
  },
  {
    title: "Sponsored versus organic performance.",
    body: "A creator’s organic post is not their sponsored post. Juice looks at what happens when they’re paid, not when they’re free.",
  },
  {
    title: "Regional lift.",
    body: "A Tamil creator with 40k followers can outperform a national one with two million on the right idea. The dataset shows you where.",
  },
  {
    title: "Content-style fingerprint.",
    body: "Hook shape, pacing, editing tempo, format mix. The reason briefs get rewritten five times is usually that the first one ignored this.",
  },
  {
    title: "Historical brand collab list.",
    body: "Which brands actually shipped with them, which ones didn’t, and what happened.",
  },
  {
    title: "Cultural moment fit.",
    body: "Whether they’re an early or late mover on a trend.",
  },
];

export default function CreatorSignals() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="max-w-[871px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
            Follower count is a starting filter, not a decision.
          </h2>
          <p className="mt-8 max-w-[640px] font-display text-[20px] leading-[1.41] text-[#444]">
            Most tools stop at reach. Juice looks at the signals that decide whether a creator can
            actually carry a campaign.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {SIGNALS.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="rounded-2xl border border-black/6 bg-white p-6"
            >
              <h3 className="font-body text-lg font-semibold leading-tight text-[#444] sm:text-xl">
                {s.title}
              </h3>
              <p className="mt-3 font-display text-sm leading-relaxed text-[#444]/85">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 max-w-[871px] font-body text-[clamp(1.75rem,2.8vw,40px)] font-semibold leading-[1.3] text-[#444] lg:mt-16"
        >
          The output is a creator match that stands up when someone in finance asks you why.
        </motion.p>
      </div>
    </section>
  );
}
