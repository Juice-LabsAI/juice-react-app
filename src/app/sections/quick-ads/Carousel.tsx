import ad1 from "../../../imports/quick-ads/ad-1.png";
import ad2 from "../../../imports/quick-ads/ad-2.png";
import ad3 from "../../../imports/quick-ads/ad-3.png";
import ad4 from "../../../imports/quick-ads/ad-4.png";
import { CampaignInput } from "../../components/CampaignInput";

/* "One brief, 24 creative angles" (Figma 911:4390): lavender card with a
   campaign-prompt input (shared with the home page) and a grid of generated ad
   creatives fading out at the bottom. */

const ADS = [ad1, ad2, ad3, ad4, ad2, ad4, ad1, ad3];

export default function Carousel() {
  return (
    <section className="bg-white">
      <div className="container-juice">
        <div className="relative overflow-hidden rounded-t-[12px] bg-[#f5f3ff] px-5 pt-[60px] sm:px-10 lg:px-[100px]">
          <h2 className="text-center font-body text-[clamp(1.875rem,3.4vw,48px)] font-medium leading-[1.2] text-[#444]">
            One brief, 24 creative angles
          </h2>

          {/* campaign prompt input — identical to the home page */}
          <div className="mt-10">
            <CampaignInput />
          </div>

          {/* generated creatives, fading out at the bottom */}
          <div className="relative mt-12 max-h-[460px] overflow-hidden">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {ADS.map((src, i) => (
                <div key={i} className="aspect-[300/384] overflow-hidden rounded-[11px] bg-white">
                  <img src={src} alt="Generated ad creative" className="size-full object-cover" draggable={false} />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[298px] bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
