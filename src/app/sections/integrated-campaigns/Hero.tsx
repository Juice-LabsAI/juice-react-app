import { openWaitlist } from "../../../lib/waitlist";

/* Integrated Campaigns hero — typographic hero (QuickAds pattern): eyebrow,
   giant H1 left, supporting line right, CTA row + trust strip below. */
export default function Hero() {
  return (
    <section className="pt-[120px] pb-10 sm:pt-[140px] lg:pb-12">
      <div className="container-juice">
        <p className="font-body text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#9165f5]">
          Integrated Campaigns
        </p>

        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[67px]">
          <h1 className="max-w-[16ch] font-body text-[clamp(2.7rem,7.4vw,108px)] font-extrabold leading-[0.9] tracking-[-0.01em] text-[#444]">
            One brief in. A whole campaign out.
          </h1>
          <p className="max-w-[420px] font-display text-[20px] font-medium leading-[1.41] text-[#444] lg:mb-3">
            Juice takes a single brief and builds the campaign around it. A core idea, 20+ pieces of
            content, sized for the audiences and formats you actually need. Ready to produce in minutes.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={openWaitlist}
            className="rounded-full bg-[#333] px-6 py-[15px] font-display text-[16px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Book a demo
          </button>
          <a
            href="https://app.juicelabs.ai"
            className="flex items-center gap-3 rounded-full border border-[#111112] py-1.5 pl-5 pr-1.5 transition hover:bg-black/5"
          >
            <span className="font-display text-[15px] font-bold text-[#111112]">See it on your brief</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-[#111112] text-white">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                <path
                  d="M5 11L11 5M11 5H6M11 5V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* trust strip */}
        <div className="mt-12 border-t border-black/10 pt-5 lg:mt-14">
          <p className="font-display text-[13px] leading-[1.5] text-[#535353]">
            Engineered on the anatomy of award-winning campaigns
            <span className="mx-3 text-[#b0b0b0]">·</span>
            80+ signals per idea
            <span className="mx-3 text-[#b0b0b0]">·</span>
            Tuned by teams that have won at Cannes and Effies
          </p>
        </div>
      </div>
    </section>
  );
}
