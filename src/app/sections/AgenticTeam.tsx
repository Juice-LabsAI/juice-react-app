import { motion, useReducedMotion } from "motion/react";
import { fadeUp, revealViewport } from "../lib/motion";
import agentsRing from "../../imports/5Jun/agents-ring.png";

// one word per quadrant; they rotate through the visible (top-left) arc
const QUADRANTS = [
  { word: "CONCEPTS", offset: "12.5%" },
  { word: "CREATIVE", offset: "37.5%" },
  { word: "VIDEO", offset: "62.5%" },
  { word: "ECOMMERCE", offset: "87.5%" },
];

/* Yellow dial with 4 curved quadrant words (rotates anti-clockwise). */
function Dial() {
  return (
    <svg viewBox="0 0 692 692" className="h-full w-full" aria-hidden>
      <circle cx="346" cy="346" r="250" fill="#FFD950" />
      <defs>
        <path id="dialArc" fill="none" d="M346,148 a198,198 0 1,1 -0.01,0" />
      </defs>
      <text
        fill="#444"
        fontSize="26"
        fontWeight="700"
        letterSpacing="3"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {QUADRANTS.map((q) => (
          <textPath key={q.word} href="#dialArc" startOffset={q.offset} textAnchor="middle">
            {q.word}
          </textPath>
        ))}
      </text>
    </svg>
  );
}

export default function AgenticTeam() {
  const reduce = useReducedMotion();
  const spin = (dir: 1 | -1, duration: number) =>
    reduce ? {} : { animate: { rotate: dir * 360 }, transition: { repeat: Infinity, ease: "linear" as const, duration } };

  return (
    <section id="agentic" className="bg-white py-8 sm:py-10">
      <div className="container-juice">
        {/* rounded dotted card; the dial is clipped to its bottom-right corner */}
        <div className="dot-grid relative overflow-hidden rounded-[28px] bg-[#f6f6f6] px-6 py-14 sm:px-12 sm:py-16 lg:min-h-[560px] lg:px-[52px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport} className="relative z-10">
            <h2 className="font-body text-[clamp(2.5rem,8.34vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.02em] text-[#444]">
              Your agentic
              <br />
              marketing team
            </h2>
            <p className="mt-8 max-w-[280px] font-display text-lg font-medium leading-[1.41] text-[#444]">
              No tool hopping, no experimenting. Just a team of agents who get it.
            </p>
          </motion.div>

          {/* dial centered exactly on the card's bottom-right corner → one quadrant visible (#6) */}
          <div className="pointer-events-none absolute bottom-0 right-0 aspect-square w-[clamp(440px,58vw,860px)] translate-x-1/2 translate-y-1/2">
            <motion.div className="absolute inset-0" {...spin(-1, 60)}>
              <Dial />
            </motion.div>
            <motion.img
              src={agentsRing}
              alt="A ring of Juice agents"
              className="absolute inset-0 h-full w-full select-none"
              draggable={false}
              {...spin(1, 75)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
