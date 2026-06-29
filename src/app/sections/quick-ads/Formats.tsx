import mini from "../../../imports/quick-ads/mini-electric.png";
import lemonCluster from "../../../imports/quick-ads/lemon-cluster.png";
import lemonSliver from "../../../imports/quick-ads/lemon-sliver.png";

/* "Formats for you" (Figma 911:4456): purple section showing the same idea
   rendered as Image / Script / Video, in two numbered showcase rows. */

function AdCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-[8px] border border-white/90 bg-[#7c54d6] p-[4px] ${className}`}
    >
      <img
        src={mini}
        alt="Generated ad creative"
        className="size-full rounded-[5px] object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

/* the mini campaign-prompt card that sits among the creatives */
function PromptCard({ className = "" }: { className?: string }) {
  return (
    <div className={`shrink-0 rounded-[8px] border border-white/90 bg-[#7c54d6] p-3 ${className}`}>
      <div className="flex h-full flex-col justify-center">
        <div className="rounded-[10px] bg-[#5d37b3] p-3.5 shadow-[0px_2.5px_5px_rgba(0,0,0,0.06)]">
          <p className="font-display text-[11px] leading-[1.4] text-white">
            The algorithm doesn&rsquo;t reward the best single ad, it rewards creative variety. Most brands run
            out of ideas before the auction does.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="flex size-5 items-center justify-center rounded-full border border-white/40 text-[11px] leading-none text-white">
              +
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 items-center gap-1 rounded-[6px] border border-white/40 px-1.5 text-[8px] text-white">
                Select a Brand
                <span className="text-[7px]">▾</span>
              </span>
              <span className="size-5 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Num({ children }: { children: string }) {
  return (
    <span className="select-none self-center font-display text-[clamp(72px,9vw,135px)] font-bold leading-none text-white/50">
      {children}
    </span>
  );
}

const LABEL = "Image › Script › Video";

export default function Formats() {
  return (
    <section className="relative overflow-hidden bg-[#8b5cf6] py-16 lg:py-[100px]">
      {/* sparkle / dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.6px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* lemons */}
      <img
        src={lemonSliver}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-10 right-0 z-0 w-[clamp(160px,22vw,340px)] select-none"
        draggable={false}
      />
      <img
        src={lemonCluster}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-[8%] z-0 w-[clamp(220px,34vw,500px)] select-none lg:-right-4"
        draggable={false}
      />

      <div className="container-juice relative z-10">
        <h2 className="font-body text-[clamp(2.25rem,4.4vw,64px)] font-bold leading-[1.2] text-white">
          Formats for you
        </h2>

        {/* block 01 */}
        <div className="mt-12">
          <p className="font-body text-[clamp(1.25rem,2.2vw,32px)] font-medium leading-[1.2] text-white">{LABEL}</p>
          <div className="mt-7 flex items-stretch gap-3">
            <AdCard className="aspect-[273/328] w-[clamp(140px,18vw,250px)]" />
            <AdCard className="aspect-[273/328] w-[clamp(140px,18vw,250px)]" />
            <Num>01</Num>
          </div>
        </div>

        {/* block 02 */}
        <div className="mt-14">
          <p className="font-body text-[clamp(1.25rem,2.2vw,32px)] font-medium leading-[1.2] text-white">{LABEL}</p>
          <div className="mt-7 flex items-stretch gap-3">
            <AdCard className="aspect-[273/328] w-[clamp(140px,18vw,250px)]" />
            <PromptCard className="aspect-[273/328] w-[clamp(140px,18vw,250px)]" />
            <AdCard className="aspect-[273/328] w-[clamp(140px,18vw,250px)]" />
            <Num>02</Num>
          </div>
        </div>
      </div>
    </section>
  );
}
