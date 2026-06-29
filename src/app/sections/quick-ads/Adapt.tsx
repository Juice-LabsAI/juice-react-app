import mini from "../../../imports/quick-ads/mini-electric.png";

/* "Adapt your ideas in multiple orientations" (Figma 928:13932): one Original
   creative beside the same creative auto-resized into several formats. Frame
   sizes mirror the design (different heights = different orientations). */

type Card = { w: number; h: number; label: string };

const ADAPTS: Card[] = [
  { w: 244, h: 184, label: "4 : 3" },
  { w: 166, h: 296, label: "9 : 16" },
  { w: 244, h: 196, label: "4 : 5" },
  { w: 244, h: 256, label: "4 : 5" },
];

function AdCard({ w, h, label }: Card) {
  return (
    <div className="flex shrink-0 flex-col gap-3.5">
      <div
        className="overflow-hidden rounded-[8px] border border-white bg-[#7c54d6] p-[3px]"
        style={{ width: w, height: h }}
      >
        <img
          src={mini}
          alt="Adapted ad creative"
          className="size-full rounded-[6px] object-cover object-top"
          draggable={false}
        />
      </div>
      <span className="font-display text-[16px] font-medium leading-[1.2] text-[#444]">{label}</span>
    </div>
  );
}

function ArrowBtn({ dir }: { dir: "left" | "right" }) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="flex size-[38px] items-center justify-center rounded-full border border-[#444] text-[#444]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={dir === "left" ? "rotate-180" : ""}>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function Adapt() {
  return (
    <section className="bg-white pb-16 lg:pb-[100px]">
      <div className="container-juice">
        <div className="overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]">
          {/* header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-8">
            <h2 className="max-w-[591px] font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.1] text-[#444]">
              Adapt your ideas in multiple orientations
            </h2>
            <p className="max-w-[321px] font-display text-[16px] leading-[1.41] text-[#444]">
              The algorithm doesn&rsquo;t reward the best single ad, it rewards creative variety. Most brands
              run out of ideas before the auction does.
            </p>
          </div>

          {/* content */}
          <div className="mt-12 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-start lg:gap-16">
            {/* original */}
            <div className="shrink-0">
              <span className="font-body text-[clamp(1.5rem,2.4vw,32px)] font-medium leading-tight text-[#444]">
                Original
              </span>
              <div className="mt-9">
                <AdCard w={244} h={296} label="6 : 3" />
              </div>
            </div>

            {/* adapts */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-body text-[clamp(1.5rem,2.4vw,32px)] font-medium leading-tight text-[#444]">
                  Adapts
                </span>
                <div className="flex gap-3">
                  <ArrowBtn dir="left" />
                  <ArrowBtn dir="right" />
                </div>
              </div>
              <div className="mt-9 flex items-start gap-3 overflow-x-auto pb-2">
                {ADAPTS.map((a, i) => (
                  <AdCard key={i} {...a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
