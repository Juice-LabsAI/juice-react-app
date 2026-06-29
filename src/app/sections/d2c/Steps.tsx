/* The six-step "what you get" grid (Figma 624:304992). The horizontal divider
   lines run full-bleed edge-to-edge; the columns and their vertical dividers sit
   inside the page gutters. 3×2 on desktop, stacked on mobile. */

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Strategy",
    body: "Positioning Statement / Brand name + Domain + Handles / Competitive Landscape / Target Audience",
  },
  {
    n: "02",
    title: "Identity",
    body: "Logo + Brand Mark / Colour System / Typography / Photography Direction / Brand Book (exportable)",
  },
  {
    n: "03",
    title: "Launch",
    body: "Positioning Statement / Brand name + Domain + Handles / Competitive Landscape / Target Audience",
  },
  {
    n: "04",
    title: "Story",
    body: "Positioning Statement / Brand name + Domain + Handles / Competitive Landscape / Target Audience",
  },
  {
    n: "05",
    title: "Packaging",
    body: "Positioning Statement / Brand name + Domain + Handles / Competitive Landscape / Target Audience",
  },
  {
    n: "06",
    title: "Commerce",
    body: "Positioning Statement / Brand name + Domain + Handles / Competitive Landscape / Target Audience",
  },
];

const ROWS = [STEPS.slice(0, 3), STEPS.slice(3, 6)];

export default function Steps() {
  return (
    <section className="bg-white pb-16 pt-10 lg:pb-[100px] lg:pt-14">
      {/* full-bleed top line */}
      <div className="border-t border-[#e6e6e6]">
        {ROWS.map((row, ri) => (
          // full-bleed line under each row of three
          <div key={ri} className="border-b border-[#e6e6e6]">
            <div className="container-juice grid grid-cols-1 divide-y divide-[#e6e6e6] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {row.map((s) => (
                <div
                  key={s.n}
                  className="relative py-10 sm:py-12 sm:pl-9 sm:pr-12 sm:[&:first-child]:pl-0 lg:min-h-[226px]"
                >
                  <span className="absolute right-0 top-10 font-body text-[32px] font-bold leading-[0.9] text-[#bfbfbf] sm:top-12 sm:right-12">
                    {s.n}
                  </span>
                  <h3 className="pr-12 font-body text-[clamp(2rem,2.8vw,2.5rem)] font-bold leading-[0.9] text-[#444] sm:pr-0">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-[330px] font-display text-[16px] leading-[1.41] text-[#444]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
