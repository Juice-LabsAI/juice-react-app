import type { ReactNode } from "react";

/* "Generic AI doesn't cut it" (Figma 911:13555 + 911:13558): a two-column
   comparison — Generic AI vs QuickAds — each a list of 5 icon rows. */

const ICONS: ReactNode[] = [
  // document
  <svg key="i0" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="3" width="14" height="18" rx="2" stroke="#444" strokeWidth="1.5" />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // list / sort
  <svg key="i1" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h12M4 12h16M4 17h9" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // grid / dots
  <svg key="i2" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="7" cy="7" r="1.6" fill="#444" />
    <circle cx="12" cy="7" r="1.6" fill="#444" />
    <circle cx="17" cy="7" r="1.6" fill="#444" />
    <circle cx="7" cy="12" r="1.6" fill="#444" />
    <circle cx="12" cy="12" r="1.6" fill="#444" />
    <circle cx="17" cy="12" r="1.6" fill="#444" />
  </svg>,
  // stacked output
  <svg key="i3" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="5" width="16" height="6" rx="1.5" stroke="#444" strokeWidth="1.5" />
    <rect x="4" y="14" width="16" height="5" rx="1.5" stroke="#444" strokeWidth="1.5" />
  </svg>,
  // arrow to line
  <svg key="i4" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 12h11M11 8l4 4-4 4M19 5v14" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const GENERIC = [
  "Works from your brief alone — no external signals",
  "Produces polished copy that sounds like every other ad",
  "No awareness of your category, competition, or buyer psychology",
  "One output per prompt — you do the variation work",
  "Can’t identify what barriers or objections actually exist",
];

const QUICKADS = [
  "Reads reviews, trends, competitors, and behaviour first",
  "Builds hooks from real signals — things people actually feel",
  "Knows what the category is saying and where the gaps are",
  "Delivers a structured set — multiple angles, ready to test",
  "Surfaces objections before writing a single word",
];

function Card({
  title,
  rows,
  bg,
  chipBg,
}: {
  title: string;
  rows: string[];
  bg: string;
  chipBg: string;
}) {
  return (
    <div className="flex w-full flex-col gap-8 rounded-[12px] p-8" style={{ backgroundColor: bg }}>
      <h3 className="font-body text-[32px] font-bold leading-[0.9] text-[#444]">{title}</h3>
      <div className="h-px w-full bg-black/10" />
      <div className="flex flex-col gap-6">
        {rows.map((row, i) => (
          <div key={row} className="flex items-center gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-[4px]"
              style={{ backgroundColor: chipBg }}
            >
              {ICONS[i]}
            </div>
            <p className="font-display text-[16px] font-medium leading-[1.2] text-[#444]">{row}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Compare() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        {/* header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-body text-[clamp(2.5rem,6.4vw,96px)] font-extrabold leading-[0.9] text-[#444]">
            Generic AI
            <br />
            doesn&rsquo;t cut it
          </h2>
          <p className="max-w-[514px] font-display text-[20px] font-medium leading-[1.41] text-[#444]">
            Ask any LLM to write you an ad and you&rsquo;ll get something that sounds like an ad. Confident.
            Generic. Forgettable. Because it has no idea what&rsquo;s actually happening in your category.
          </p>
        </div>

        {/* comparison cards */}
        <div className="mt-12 flex flex-col gap-3 lg:mt-16 lg:flex-row">
          <Card title="Generic AI" rows={GENERIC} bg="#f8f8f8" chipBg="#ececec" />
          <Card title="QuickAds" rows={QUICKADS} bg="#f5f3ff" chipBg="#ede9ff" />
        </div>
      </div>
    </section>
  );
}
