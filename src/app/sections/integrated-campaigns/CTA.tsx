import { openWaitlist } from "../../../lib/waitlist";
import lemons from "../../../imports/d2c/cta-lemons.png";

/* Closing CTA card — d2c CTA banner pattern: lemons left, copy + CTAs right. */
export default function CTA() {
  return (
    <section className="bg-white py-16 lg:py-[100px]">
      <div className="container-juice">
        <div className="relative overflow-hidden rounded-xl bg-[#f6f6f6]">
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            {/* lemon slices, bleeding off the bottom-left */}
            <div className="relative hidden min-h-[300px] lg:block">
              <img
                src={lemons}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-6 top-10 w-[280px] max-w-none rotate-[2.6deg] select-none object-contain object-top"
                draggable={false}
              />
            </div>

            {/* copy */}
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-10 lg:py-[100px] lg:pr-[100px] lg:pl-0">
              <h2 className="font-body text-[clamp(2.25rem,4.3vw,3.875rem)] font-extrabold leading-[0.9] text-[#444]">
                Bring us your brief. We&rsquo;ll bring you the campaign.
              </h2>

              <p className="font-display text-[20px] leading-[1.41] text-[#444]">
                20 minutes. Your next launch. On your board.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openWaitlist}
                  className="rounded-full bg-[#333] px-7 py-5 font-display text-[20px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]"
                >
                  Book a demo
                </button>
                <a
                  href="mailto:fresh@juicelabs.ai"
                  className="rounded-full border border-[#111112] px-6 py-[15px] font-display text-[16px] font-bold leading-none text-[#111112] transition hover:bg-black/5"
                >
                  fresh@juicelabs.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
