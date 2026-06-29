/* "Designed for Meta & Google" (Figma 911:4433): heading + supporting copy,
   three coloured stat cards, then an eyebrow + a mixed-weight statement. */

const CARDS = [
  {
    bg: "#c8b0ff",
    stat: "3-5x",
    caption: "more creative variations needed to exit learning phase faster",
  },
  {
    bg: "#ffb189",
    stat: "37%",
    caption: "ad performances driven by creative quality, per Meta’s own data",
  },
  {
    bg: "#ffe689",
    stat: "2 weeks",
    caption: "before a winning ad, fatigues and CTR begins to drop",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <div className="overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]">
          {/* header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
            <h2 className="max-w-[434px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
              Designed for Meta &amp; Google
            </h2>
            <p className="max-w-[321px] font-display text-[16px] leading-[1.41] text-[#444]">
              The algorithm doesn&rsquo;t reward the best single ad, it rewards creative variety. Most brands
              run out of ideas before the auction does.
            </p>
          </div>

          {/* stat cards */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-[52px]">
            {CARDS.map((c) => (
              <div
                key={c.stat}
                className="flex min-h-[232px] flex-col gap-7 rounded-[12px] px-8 py-[53px]"
                style={{ backgroundColor: c.bg }}
              >
                <p className="font-display text-[60px] font-bold leading-none text-[#444]">{c.stat}</p>
                <p className="max-w-[345px] font-display text-[20px] font-medium leading-[1.41] text-[#444]">
                  {c.caption}
                </p>
              </div>
            ))}
          </div>

          {/* eyebrow + statement */}
          <div className="mt-14 flex flex-col gap-8 lg:mt-24 lg:flex-row lg:gap-[90px]">
            <p className="max-w-[243px] shrink-0 font-body text-[20px] uppercase leading-[1.24] tracking-[0.4px] text-[#535353]">
              What Meta and Google reward?
            </p>
            <p className="max-w-[871px] font-body text-[clamp(1.75rem,2.8vw,40px)] font-semibold leading-[1.3] text-[#444]">
              Quick Ads doesn&rsquo;t give you one ad. It gives you a set —{" "}
              <span className="font-extrabold">
                barrier hooks, contrast angles, social proof cuts, trend-led formats.
              </span>{" "}
              This is so that the platform always has something fresh to test.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
