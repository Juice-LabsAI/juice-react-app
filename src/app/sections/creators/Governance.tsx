import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S6 — speed and governance. Two columns: prose left, guardrails checklist
   card right (4 bullets), following the quick-ads Compare row treatment. */

const GUARDRAILS = [
  "Ideas written against the creator’s own content signature",
  "Claims tagged for substantiation, compliance, and category rules",
  "Regional variants flagged for language-specific approvals",
  "Brand voice, DNC list, and category taboos pre-loaded from your Brand OS",
];

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7"
        stroke="#444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Governance() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-[871px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]"
        >
          Fewer approval rounds. Same brand safety.
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* prose */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-[640px] font-display text-[20px] leading-[1.41] text-[#444]"
          >
            <p>
              Creator campaigns die in two places. The brief takes three weeks to write. The legal
              review takes three more to clear.
            </p>
            <p className="mt-6 font-bold">Juice compresses both.</p>
            <p className="mt-6">
              Briefs are written against the creator&rsquo;s actual content, so the first draft
              already sounds like something they&rsquo;d say. Fewer regeneration cycles with the
              creator&rsquo;s manager. Fewer edits from the brand safety team, because the risk
              profile is legible from the start. You can see which claim needs substantiation, which
              line needs a disclaimer, which format needs a pre-shoot review.
            </p>
            <p className="mt-6">
              The three-week brief and the three-week review are what killed the timing advantage
              that made creator content work in the first place. Getting both down to days is most of
              the value.
            </p>
          </motion.div>

          {/* guardrails checklist card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="flex flex-col gap-8 self-start rounded-[12px] bg-[#f5f3ff] p-8"
          >
            <h3 className="font-body text-2xl font-bold leading-[1.1] text-[#444] sm:text-[28px]">
              Every idea ships with the guardrails already showing.
            </h3>
            <div className="h-px w-full bg-black/10" />
            <div className="flex flex-col gap-6">
              {GUARDRAILS.map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#ede9ff]">
                    <Check />
                  </div>
                  <p className="font-display text-[16px] font-medium leading-[1.2] text-[#444]">
                    {row}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
