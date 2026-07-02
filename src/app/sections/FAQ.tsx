import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUp, revealViewport } from "../lib/motion";
import orange from "../../imports/5Jun/cefd9fc715838eba06f8eff66a58a5bb55b000d7.png";

const FAQS = [
  {
    q: "What types of ads can Juice make?",
    a: "Performance ads, full-funnel campaigns, creator campaigns, and custom brand builds—across static and video, in the formats your channels need.",
  },
  {
    q: "Why is Juice better than Claude or ChatGPT?",
    a: "General AI tools produce content, but they don’t know what makes an ad perform. Juice is trained specifically on high-performing ads, live signals, and real campaign results—so it starts from what works.",
  },
  {
    q: "Are the creatives on-brand?",
    a: "Yes. Juice learns your brand’s voice, tone, and guidelines, so every idea reflects you rather than a generic template.",
  },
  {
    q: "How much creative control do I have?",
    a: "Full control. You steer the direction, refine ideas, and jam with your team—Juice does the heavy lifting, but the output stays yours.",
  },
  {
    q: "Is Juice suited for my brand’s scale?",
    a: "Yes—from small teams and freelancers to mid-market and global enterprises. It flexes to how you work.",
  },
  {
    q: "How does Juice know what will work?",
    a: "It decodes the patterns behind winning ads across 80+ signals, reads live cultural and category trends, and folds in your brand guidelines before a single dollar is spent.",
  },
  {
    q: "What makes it better than ad generators?",
    a: "Ad generators churn out content that’s blind to performance. Juice figures out the idea first—what to make and why—then produces and optimizes it, so you’re not scaling a weak concept.",
  },
];

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M4 12h16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 4v16"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)" }}
      />
    </svg>
  );
}

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="border-t border-black/15">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-medium text-[#333] sm:text-xl">{q}</span>
        <PlusMinus open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[722px] pb-6 font-display text-lg leading-relaxed text-[#333] sm:text-xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0); // one open at a time; first open by default

  return (
    <section id="faq" className="bg-white">
      <div className="container-juice">
        <div className="relative overflow-hidden rounded-t-xl bg-[#ffd950] px-6 py-16 sm:px-12 sm:py-24">
          {/* half-orange anchored to the bottom-left, clipped by the card */}
          <img
            src={orange}
            alt=""
            className="pointer-events-none absolute -bottom-12 left-6 hidden aspect-[382/374] w-[300px] select-none object-fill sm:left-12 lg:block"
            draggable={false}
          />
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
            {/* left: heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="lg:w-[440px] lg:shrink-0"
            >
              <h2 className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.2] text-[#333]">
                Questions?
                <br />
                We may have already answered them
              </h2>
            </motion.div>

            {/* right: accordion (#7) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="border-b border-black/15 lg:max-w-[774px] lg:flex-1"
            >
              {FAQS.map((f, i) => (
                <Item
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
