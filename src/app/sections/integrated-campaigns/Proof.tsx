import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* Social proof — three testimonial cards on the lavender band treatment. */

const QUOTES = [
  {
    quote:
      "With Juice, our process went from weeks to minutes without losing rigour. The recommendations are consistently strong. Clear go/no-go signals, sharp hypotheses for improvement.",
    name: "Vivek Nauhbar",
    role: "Global Lead, Generative AI Transformation, Insights & Marketing, Reckitt",
  },
  {
    quote:
      "It’s surprising how much clarity Juice brings within minutes. We haven’t seen that from other AI tools.",
    name: "Sr. Marketing Director",
    role: "CPG",
  },
  {
    quote: "Juice made us pitch faster and sharper. It’s changed how we approach the business.",
    name: "Growth Lead",
    role: "D2C",
  },
];

export default function Proof() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              className="flex flex-col justify-between gap-8 rounded-[12px] bg-[#f5f3ff] p-7 sm:p-8"
            >
              <blockquote className="font-display text-[17px] font-medium leading-[1.41] text-[#444]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="font-body text-[16px] font-bold text-[#444]">{q.name}</p>
                <p className="mt-1 font-display text-[14px] leading-[1.4] text-[#535353]">{q.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
