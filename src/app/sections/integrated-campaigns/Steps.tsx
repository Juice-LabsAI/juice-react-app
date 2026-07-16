/* "Brief to board in four steps" — divided step grid (d2c Steps pattern):
   full-bleed horizontal rules, in-gutter vertical dividers, grey step
   numbers right-aligned. One row of four on desktop. */

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Drop the brief",
    body: "Objective, audience, market, product, voice. Or plug in your Brand OS and skip the setup.",
  },
  {
    n: "02",
    title: "Pick a core idea",
    body: "Juice returns strategic angles built on fresh insight. You pick the one worth betting on.",
  },
  {
    n: "03",
    title: "See the full plan",
    body: "A board of 20+ cards, each carrying a role, an audience, a format, and the metric it’s meant to move.",
  },
  {
    n: "04",
    title: "Generate the assets",
    body: "Click a card, get the finished asset, iterate in the canvas until it’s shippable.",
  },
];

export default function Steps() {
  return (
    <section className="bg-white pb-16 pt-10 lg:pb-[100px] lg:pt-14">
      <div className="container-juice">
        <h2 className="font-body text-[clamp(1.875rem,4vw,3rem)] font-medium leading-[1.2] text-[#444]">
          Brief to board in four steps.
        </h2>
      </div>

      <div className="mt-10 border-t border-[#e6e6e6] lg:mt-12">
        <div className="border-b border-[#e6e6e6]">
          <div className="container-juice grid grid-cols-1 divide-y divide-[#e6e6e6] sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:[&>*:nth-child(odd)]:pl-0 lg:grid-cols-4 lg:[&>*:nth-child(odd)]:pl-9 lg:[&>*:first-child]:pl-0">
            {STEPS.map((s) => (
              <div key={s.n} className="relative py-10 sm:py-12 sm:pl-9 sm:pr-10 lg:min-h-[226px]">
                <span className="absolute right-0 top-10 font-body text-[32px] font-bold leading-[0.9] text-[#bfbfbf] sm:top-12 sm:right-10">
                  {s.n}
                </span>
                <h3 className="pr-12 font-body text-[clamp(1.75rem,2.4vw,2.125rem)] font-bold leading-[1] text-[#444]">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-[330px] font-display text-[16px] leading-[1.41] text-[#444]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
