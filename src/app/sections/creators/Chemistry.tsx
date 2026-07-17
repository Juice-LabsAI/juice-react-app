import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp, staggerParent, revealViewport } from "../../lib/motion";

/* S3 — Creator Chemistry, centerpiece #1. Hero-scale headline, generous
   whitespace, three panels each with a built-in-code graphic (audience-overlap
   venn, content-DNA fingerprint bars, pitched-idea card mock), quote closing
   the section. Graphics are styled JSX/SVG composed from contract tokens —
   no raster placeholders. */

/* -- graphic 1: audience overlap venn -------------------------------------- */
function AudienceOverlap() {
  return (
    <div className="relative flex h-[180px] items-center justify-center overflow-hidden rounded-[12px] bg-[#f5f3ff]">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex items-center">
        <div className="flex size-[124px] items-end justify-center rounded-full border border-[#8656f4] bg-[#8656f4]/15 pb-3">
          <span className="max-w-[64px] text-center font-display text-[10px] uppercase leading-[1.3] tracking-[0.04em] text-[#444]">
            creator audience
          </span>
        </div>
        <div className="-ml-11 flex size-[124px] items-end justify-center rounded-full border border-[#e4b714] bg-[#ffd950]/45 pb-3">
          <span className="max-w-[64px] text-center font-display text-[10px] uppercase leading-[1.3] tracking-[0.04em] text-[#444]">
            category buyers
          </span>
        </div>
        <span className="absolute left-1/2 top-[38%] -translate-x-1/2 rounded-full bg-[#333] px-2.5 py-1 font-display text-[11px] font-bold leading-none text-white">
          high overlap
        </span>
      </div>
    </div>
  );
}

/* -- graphic 2: content-DNA fingerprint bars -------------------------------- */
const DNA_ROWS: { label: string; width: string; color: string }[] = [
  { label: "Tone", width: "82%", color: "#8656f4" },
  { label: "Pace", width: "58%", color: "#ab86ff" },
  { label: "Hook", width: "90%", color: "#fe5c2b" },
  { label: "Format", width: "44%", color: "#ffd950" },
];

function ContentDNA() {
  return (
    <div className="flex h-[180px] flex-col justify-center gap-4 rounded-[12px] bg-[#f5f3ff] px-6">
      {DNA_ROWS.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="w-[52px] shrink-0 font-display text-[11px] uppercase tracking-[0.04em] text-[#535353]">
            {row.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full"
              style={{ width: row.width, backgroundColor: row.color }}
            />
          </div>
        </div>
      ))}
      <p className="font-display text-[10px] uppercase tracking-[0.04em] text-[#666]">
        watch-to-completion fingerprint
      </p>
    </div>
  );
}

/* -- graphic 3: pitched-idea card mock, in the creator's voice -------------- */
function PitchedIdea() {
  return (
    <div className="flex h-[180px] items-center justify-center rounded-[12px] bg-[#f5f3ff] px-5">
      <div className="w-full max-w-[300px] rounded-[8px] bg-white p-4 ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-6 shrink-0 rounded-full bg-[#8656f4]" aria-hidden />
            <span className="font-display text-[12px] font-bold text-[#444]">@derm.diaries</span>
          </div>
          <span className="rounded-full bg-[#ffd950] px-2 py-1 font-display text-[10px] font-bold leading-none text-[#444]">
            pitched idea
          </span>
        </div>
        <p className="mt-3 font-display text-[12px] leading-[1.4] text-[#444]">
          &ldquo;POV: your moisturizer has been gatekeeping actives &mdash; filmed at my sink, not
          your studio.&rdquo;
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#ede9ff] px-2 py-1 font-display text-[10px] leading-none text-[#444]">
            their hook
          </span>
          <span className="rounded-full bg-[#ede9ff] px-2 py-1 font-display text-[10px] leading-none text-[#444]">
            claims tagged
          </span>
        </div>
      </div>
    </div>
  );
}

/* -- section ---------------------------------------------------------------- */
const PANELS: { title: string; body: string; graphic: ReactNode }[] = [
  {
    title: "The creator’s audience.",
    body: "Category affinity, spend signals, region, language, the topics their audience already trusts them on. A dermatologist creator whose audience actually asks about actives is worth more to a skincare launch than a lifestyle creator with four times the following.",
    graphic: <AudienceOverlap />,
  },
  {
    title: "The creator’s content DNA.",
    body: "Tone, pace, hook style, the formats their audience watches to completion. A UGC-style creator can carry a demo. A meme creator can carry a category truth. Very few can do both, and most briefs pretend they can.",
    graphic: <ContentDNA />,
  },
  {
    title: "The idea.",
    body: "Written to their content, not to a brand template. Every match comes with the idea Juice would pitch that creator specifically, in a hook their audience recognizes as theirs.",
    graphic: <PitchedIdea />,
  },
];

export default function Chemistry() {
  return (
    <section className="bg-white py-20 text-center sm:py-24 lg:py-28">
      <div className="container-juice">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <h2 className="font-body text-[clamp(2.5rem,6.4vw,96px)] font-extrabold leading-[0.9] text-[#444]">
            Creator Chemistry.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] font-body text-[clamp(1.25rem,2.2vw,32px)] font-medium leading-[1.2] text-[#444]">
            The right brand. The right creator. An idea both sides actually want to make.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto mt-12 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444] lg:mt-16"
        >
          <p>
            Most creator work goes wrong before the money is spent. Someone picks the creator on
            reach. Someone writes a brief that treats the creator as a delivery vehicle. The creator
            posts it. Their audience clocks the pitch in three seconds. The brand blames the creator.
          </p>
          <p className="mt-6">
            Chemistry is what fixes this at the top of the decision, not the bottom of it.
          </p>
          <p className="mt-6 font-bold">Juice checks three things at once.</p>
        </motion.div>

        {/* three panels */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5"
        >
          {PANELS.map(({ title, body, graphic }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6"
            >
              {graphic}
              <h3 className="mt-6 font-body text-2xl font-semibold leading-tight text-[#444]">
                {title}
              </h3>
              <p className="mt-3 font-display text-[16px] leading-[1.41] text-[#444]">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto mt-12 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444] lg:mt-16"
        >
          When the three line up, the content converts, the brand safety team stops asking for six
          rounds of edits, and the creator posts it because they wanted to.
        </motion.p>

        {/* closing quote */}
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mx-auto mt-14 max-w-[871px] lg:mt-20"
        >
          <blockquote className="font-body text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.2] text-[#444]">
            &ldquo;First creator campaign our legal team cleared on the first pass. Also the first
            one that felt like the creator, not our deck.&rdquo;
          </blockquote>
          <figcaption className="mt-5 font-display text-[16px] text-[#535353]">
            &mdash; Marketing Lead, personal care brand
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
