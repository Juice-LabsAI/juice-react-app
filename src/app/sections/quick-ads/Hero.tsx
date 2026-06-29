/* QuickAds hero (Figma 911:13432): big "QuickAds" wordmark + tagline on the
   left, a short supporting line on the right, bottom-aligned. */
export default function Hero() {
  return (
    <section className="pt-[120px] pb-10 sm:pt-[140px] lg:pb-12">
      <div className="container-juice">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[67px]">
          <div className="flex flex-col gap-[18px]">
            <h1 className="font-body text-[clamp(3.75rem,9.3vw,134px)] font-extrabold leading-[0.9] text-[#444]">
              QuickAds
            </h1>
            <p className="font-body text-[clamp(1.75rem,3vw,43px)] font-bold leading-[0.95] text-[#444]">
              Ads Engineered to outperform
            </p>
          </div>
          <p className="max-w-[358px] font-display text-[20px] font-medium leading-[1.37] text-[#444] lg:mb-3">
            Quick Ads reads behaviour, reviews, competition, and trends, then builds hooks designed to
            convert.
          </p>
        </div>
      </div>
    </section>
  );
}
