import { motion } from "motion/react";
import { fadeUp, revealViewport } from "../../lib/motion";

/* S4 — Complete Creator Plans, centerpiece #2. Grey rounded panel holding a
   stylized product-board: cast rows on the left, role columns on top
   (Reach / Regional / Content / Stage / Metric), with Juice's imbalance flags
   rendered inline. The five role bullets sit below as the legend. */

type Row = {
  cast: string;
  cells: { text: string; flag?: string }[];
};

const COLUMNS = ["Cast", "Reach role", "Regional role", "Content role", "Stage role", "Metric role"];

const ROWS: Row[] = [
  {
    cast: "@unbox.daily",
    cells: [
      { text: "Micro" },
      { text: "EN · National" },
      { text: "Long-form" },
      { text: "Plant" },
      { text: "Awareness lift" },
    ],
  },
  {
    cast: "@derm.diaries",
    cells: [
      { text: "Micro · Category expert" },
      { text: "EN · National" },
      { text: "Demo" },
      { text: "Proof" },
      { text: "Save rate" },
    ],
  },
  {
    cast: "@chennai.eats",
    cells: [
      { text: "Nano" },
      { text: "Tamil · Chennai" },
      { text: "Review" },
      { text: "Regional" },
      { text: "Regional lift" },
    ],
  },
  {
    cast: "@glow.gospel",
    cells: [
      { text: "Macro", flag: "top-heavy on macros" },
      { text: "EN · National" },
      { text: "Hook" },
      { text: "Plant" },
      { text: "Awareness lift" },
    ],
  },
  {
    cast: "@meme.factory",
    cells: [
      { text: "Mid" },
      { text: "EN · National" },
      { text: "Meme" },
      { text: "Spread", flag: "stage gap: closing has no creators" },
      { text: "Share" },
    ],
  },
];

const LEGEND: { role: string; detail: string }[] = [
  { role: "Reach role", detail: "Nano, Micro, Mid, Macro, Category expert" },
  { role: "Regional role", detail: "Which language, which market, which cultural moment" },
  { role: "Content role", detail: "Hook, demo, review, meme, long-form" },
  { role: "Stage role", detail: "Where they land in the campaign arc" },
  {
    role: "Metric role",
    detail:
      "What you’re measuring them against. Awareness lift. Save rate. Comment quality. Conversion. Share.",
  },
];

function Flag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#fe5c2b] px-2.5 py-1 font-display text-[11px] font-bold leading-none text-white">
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
        <path d="M1 1v9M1 1h7L6 3.5 8 6H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}

export default function PlanBoard() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <div className="overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
            <h2 className="font-body text-[clamp(2.5rem,6.4vw,96px)] font-extrabold leading-[0.9] text-[#444]">
              Complete Creator Plans.
            </h2>
            <p className="mt-6 max-w-[760px] font-body text-[clamp(1.25rem,2.2vw,32px)] font-medium leading-[1.2] text-[#444]">
              Reach. Type. Region. Format. Stage. Orchestrated.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444] lg:mt-14"
          >
            <p>A single creator can move a niche. A campaign needs a cast.</p>
            <p className="mt-6">
              Juice plans creators the way a director casts a film. Nano creators go where
              credibility matters most. Regional creators go where language and cultural context beat
              reach. Macros go where the story needs to travel. Category insiders go where trust is
              the hardest thing to buy. Superfans go where retention lives.
            </p>
            <p className="mt-6 font-bold">Every creator on the board carries a role.</p>
          </motion.div>

          {/* stylized product board */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 overflow-x-auto lg:mt-14"
          >
            <div className="min-w-[860px] overflow-hidden rounded-[12px] bg-white ring-1 ring-black/5">
              <div className="grid grid-cols-[1.3fr_1.2fr_1fr_1fr_1.2fr_1fr] bg-[#f5f3ff]">
                {COLUMNS.map((col) => (
                  <div
                    key={col}
                    className="border-l border-black/5 px-4 py-3 font-body text-[13px] font-bold uppercase tracking-[0.04em] text-[#444] first:border-l-0"
                  >
                    {col}
                  </div>
                ))}
              </div>
              {ROWS.map((row) => (
                <div
                  key={row.cast}
                  className="grid grid-cols-[1.3fr_1.2fr_1fr_1fr_1.2fr_1fr] border-t border-black/5"
                >
                  <div className="flex items-center gap-2 px-4 py-4">
                    <span className="size-6 shrink-0 rounded-full bg-[#c8b0ff]" aria-hidden />
                    <span className="font-display text-[14px] font-bold text-[#444]">{row.cast}</span>
                  </div>
                  {row.cells.map((cell, i) => (
                    <div
                      key={`${row.cast}-${COLUMNS[i + 1]}`}
                      className="flex flex-wrap content-center items-center gap-1.5 border-l border-black/5 px-4 py-4 font-display text-[14px] leading-[1.2] text-[#444]"
                    >
                      <span>{cell.text}</span>
                      {cell.flag && <Flag label={cell.flag} />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* role legend — the five role bullets */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 max-w-[871px] divide-y divide-black/10 lg:mt-12"
          >
            {LEGEND.map(({ role, detail }) => (
              <li key={role} className="py-4 font-display text-[16px] leading-[1.41] text-[#444]">
                <span className="font-bold">{role}</span> &mdash; {detail}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-10 max-w-[760px] font-display text-[20px] leading-[1.41] text-[#444] lg:mt-14"
          >
            <p>
              The board tells you when a plan is too top-heavy on macros. When a language is missing.
              When your closing stage has no creators in it. When you&rsquo;re paying for reach in a
              market where credibility would compound harder for less.
            </p>
            <p className="mt-6 font-bold">
              This is what turns creator marketing from an assembly of posts into a campaign.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
