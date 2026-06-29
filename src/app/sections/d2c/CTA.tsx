import lemons from "../../../imports/d2c/cta-lemons.png";

/* Closing CTA card — "You don't need another AI tool. You JUST need a brand."
   Mirrors Figma node 612:260268. */
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
                alt="Falling lemon slices"
                className="pointer-events-none absolute -bottom-6 left-6 top-10 w-[280px] max-w-none rotate-[2.6deg] select-none object-contain object-top"
                draggable={false}
              />
            </div>

            {/* copy */}
            <div className="flex flex-col items-start gap-8 px-7 py-12 sm:px-10 lg:py-[100px] lg:pr-[100px] lg:pl-0">
              <h2 className="font-body text-[clamp(2.25rem,4.3vw,3.875rem)] font-extrabold leading-[0.9] text-[#444]">
                You don&rsquo;t need another AI tool. You{" "}
                <span className="text-[#9165f5]">JUST</span> need a brand.
              </h2>

              <div className="font-display text-[20px] leading-[1.41] text-[#444]">
                <p>ChatGPT can write you a tagline.</p>
                <p>Midjourney can generate a logo.</p>
                <p>Canva can mock up a post.</p>
                <p className="mt-6 max-w-[640px]">
                  You&rsquo;ll have 40 tabs open, 12 disconnected outputs, and something that looks like a
                  brand but doesn&rsquo;t hold together.
                </p>
                <p className="mt-6 font-bold text-[24px]">
                  Generic AI gives you pieces. Juice builds a system.
                </p>
              </div>

              <a
                href="https://creative.juicelabs.ai/"
                className="rounded-full bg-[#333] px-7 py-5 font-display text-[20px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]"
              >
                Start Building
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
