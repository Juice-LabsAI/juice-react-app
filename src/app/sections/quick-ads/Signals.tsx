import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import signalsAd from "../../../imports/quick-ads/signals-ad.png";

/* "Signals that power each ad" (Figma 911:13348): a left-to-right flow —
   Signals stream into a hub diamond; Insights are derived; the insight currently
   in focus streams on to a second diamond right before the Ad, which streams
   into the Ad.

   Animations:
   - Each signal pill streams a single travelling segment into the hub diamond.
   - The Insights auto-cycle: one highlights every 1.5s, looping back to the first.
   - A live wire always connects the highlighted insight to the second diamond
     (measured geometry, re-pointed as the highlight moves), and the second
     diamond streams on into the Ad. */

const SIGNALS = [
  "Social Listening",
  "Google Trends",
  "Reddit / Discord Themes",
  "Amazon / App Reviews",
  "Channel Best Practices",
  "Memes & Culture Mapping",
  "Competition Mapping",
  "Trend Reports",
  "Expert Reviews",
  "Geopolitical Trends",
  "Syndicated Data",
];
const INSIGHTS = [
  ["Emotional Ownership", "Buyers want character, not just efficiency."],
  ["Beyond Technology", "EV appeal grows when personality feels real."],
  ["Category Sameness", "Standing out matters in crowded markets."],
  ["Modern Rebellion", "Consumers seek distinction without unnecessary noise."],
  ["Escape Screens", "Driving becomes valuable when attention returns."],
  ["Personal Identity", "People reject products that feel corporate."],
  ["Mainstream Adoption", "Electric wins when compromise disappears completely."],
];

const CYCLE_MS = 1500;

function VLabel({ children }: { children: string }) {
  return (
    <span
      className="font-body text-[clamp(1.75rem,2.8vw,45px)] font-extrabold leading-none text-[#444]"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {children}
    </span>
  );
}

function Diamond() {
  return (
    <span className="flex size-[18px] rotate-45 items-center justify-center rounded-[2px] bg-[#6d6d6d]">
      <span className="size-1.5 rounded-[1px] bg-white" />
    </span>
  );
}

type Pt = { x: number; y: number };
type Geo = {
  w: number;
  h: number;
  pills: Pt[];
  diamond1: Pt | null;
  diamond2: Pt | null;
  active: Pt | null;
  ad: Pt | null;
};

/* deterministic pseudo-random in [0,1) so every wire gets a stable but varied
   segment length / speed / phase (the design's dark segments sit at random
   positions along each wire) */
const rng = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/* a wire = faint grey base + a single short dark segment travelling along it.
   Colours/weights match the Figma connector: ~#d9d9d9 hairlines with a short
   ~#444 streaming segment. pathLength normalises every wire to 100 units. */
function Wire({ d, seed, animate }: { d: string; seed: number; animate: boolean }) {
  const len = 14 + rng(seed, 1) * 11; // 14–25% of the normalised path (short)
  const dur = 3 + rng(seed, 2) * 2.4; // 3–5.4s (half speed)
  const delay = -rng(seed, 3) * dur; // random starting phase
  return (
    <g>
      <path d={d} stroke="#d9d9d9" strokeWidth={1} fill="none" />
      {animate && (
        <path
          d={d}
          pathLength={100}
          stroke="#444"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: `${len.toFixed(1)} ${(200 - len).toFixed(1)}`,
            animation: `qa-stream ${dur.toFixed(2)}s linear infinite`,
            animationDelay: `${delay.toFixed(2)}s`,
          }}
        />
      )}
    </g>
  );
}

export default function Signals() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [geo, setGeo] = useState<Geo>({ w: 0, h: 0, pills: [], diamond1: null, diamond2: null, active: null, ad: null });

  const flowRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLElement | null)[]>([]);
  const insightRefs = useRef<(HTMLElement | null)[]>([]);
  const insightsColRef = useRef<HTMLDivElement>(null);
  const diamond1Ref = useRef<HTMLSpanElement>(null);
  const diamond2Ref = useRef<HTMLSpanElement>(null);
  const adRef = useRef<HTMLDivElement>(null);

  // auto-cycle the highlighted insight, looping back to the first
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % INSIGHTS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  // measure flow geometry into the SVG's pixel coordinate space. Kept in a ref so
  // resize/observer callbacks always run the latest version (reading current active).
  const recomputeRef = useRef<() => void>(() => {});
  recomputeRef.current = () => {
    const flow = flowRef.current;
    if (!flow) return;
    const fr = flow.getBoundingClientRect();
    const rel = (r: DOMRect) => ({ l: r.left - fr.left, r: r.right - fr.left, cy: r.top - fr.top + r.height / 2 });
    const center = (el: Element | null): Pt | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - fr.left + r.width / 2, y: r.top - fr.top + r.height / 2 };
    };
    const pills: Pt[] = pillRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const m = rel(el.getBoundingClientRect());
      return { x: m.r, y: m.cy };
    });
    let activePt: Pt | null = null;
    const col = insightsColRef.current;
    const ael = insightRefs.current[active];
    if (col && ael) {
      const cm = rel(col.getBoundingClientRect());
      const am = rel(ael.getBoundingClientRect());
      activePt = { x: cm.r, y: am.cy };
    }
    let adPt: Pt | null = null;
    if (adRef.current) {
      const m = rel(adRef.current.getBoundingClientRect());
      adPt = { x: m.l, y: m.cy };
    }
    setGeo({
      w: fr.width,
      h: fr.height,
      pills,
      diamond1: center(diamond1Ref.current),
      diamond2: center(diamond2Ref.current),
      active: activePt,
      ad: adPt,
    });
  };

  // re-measure when the highlight changes (re-points the active wire)
  useLayoutEffect(() => {
    recomputeRef.current();
  }, [active]);

  // set up resize / observer listeners once
  useEffect(() => {
    const fn = () => recomputeRef.current();
    fn();
    const ro = new ResizeObserver(fn);
    if (flowRef.current) ro.observe(flowRef.current);
    window.addEventListener("resize", fn);
    const settle = window.setTimeout(fn, 350); // re-measure once fonts/images settle
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fn);
      window.clearTimeout(settle);
    };
  }, []);

  // horizontal wire with eased tangents at both ends; `gapStart`/`gapEnd` keep the
  // line clear of the elements it links
  const link = (a: Pt, b: Pt, gapStart = 6, gapEnd = 6) => {
    const dir = b.x >= a.x ? 1 : -1;
    const sx = a.x + gapStart * dir;
    const ex = b.x - gapEnd * dir;
    const k = Math.max(26, Math.abs(ex - sx) * 0.5);
    return `M ${sx} ${a.y} C ${sx + k * dir} ${a.y}, ${ex - k * dir} ${b.y}, ${ex} ${b.y}`;
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <style>{`@keyframes qa-stream { to { stroke-dashoffset: -200; } }`}</style>

      <div className="container-juice">
        <h2 className="font-body text-[clamp(2.5rem,5.6vw,80px)] font-extrabold leading-[0.98] text-[#444]">
          Signals that
          <br />
          power each ad
        </h2>

        {/* desktop flow */}
        <div ref={flowRef} className="relative mt-14 hidden items-stretch lg:flex">
          {/* wire overlay (behind the content) */}
          {geo.w > 0 && (
            <svg
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              className="pointer-events-none absolute inset-0 z-0"
              fill="none"
              aria-hidden
            >
              {geo.diamond1 &&
                geo.pills.map((p, i) => (
                  <Wire key={i} d={link(p, geo.diamond1!)} seed={i} animate={!reduce} />
                ))}
              {geo.active && geo.diamond2 && (
                <Wire d={link(geo.active, geo.diamond2)} seed={50} animate={!reduce} />
              )}
              {geo.diamond2 && geo.ad && <Wire d={link(geo.diamond2, geo.ad)} seed={60} animate={!reduce} />}
            </svg>
          )}

          {/* Signals stage */}
          <div className="relative z-10 flex items-stretch gap-5">
            <div className="flex items-end">
              <VLabel>Signals</VLabel>
            </div>
            <div className="flex flex-col items-end gap-[18px] pt-1">
              {SIGNALS.map((s, i) => (
                <span
                  key={s}
                  ref={(el) => {
                    pillRefs.current[i] = el;
                  }}
                  className="whitespace-nowrap rounded-[12px] bg-[#f5f3ff] px-4 py-2 font-display text-[16px] leading-[1.05] text-[#444]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* hub diamond — the pill wires converge here (centred in the gap) */}
          <div className="relative z-10 flex flex-1 items-center justify-center">
            <span ref={diamond1Ref}>
              <Diamond />
            </span>
          </div>

          {/* Insights stage — the label floats at the bottom-left (absolute) so it
              doesn't widen the column; that keeps both diamonds centred on the
              actual insight text and the active wire's right edge clean */}
          <div ref={insightsColRef} className="relative z-10 flex w-[260px] flex-col justify-between gap-5 py-2">
            {INSIGHTS.map(([title, body], i) => (
              <div
                key={title}
                ref={(el) => {
                  insightRefs.current[i] = el;
                }}
                className="flex flex-col gap-1 transition-colors duration-500"
              >
                <p
                  className={`font-display text-[16px] font-bold leading-[1.1] ${
                    i === active ? "text-[#444]" : "text-[#b0b0b0]"
                  }`}
                >
                  {title}
                </p>
                <p
                  className={`font-display text-[14px] leading-[1.26] ${
                    i === active ? "text-[#444]" : "text-[#b0b0b0]"
                  }`}
                >
                  {body}
                </p>
              </div>
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 font-body text-[clamp(1.75rem,2.8vw,45px)] font-extrabold leading-none text-[#444]"
              style={{ writingMode: "vertical-rl", transform: "translateX(calc(-100% - 20px)) rotate(180deg)" }}
            >
              Insights
            </span>
          </div>

          {/* second diamond — right before the ad (centred in the gap) */}
          <div className="relative z-10 flex flex-1 items-center justify-center">
            <span ref={diamond2Ref}>
              <Diamond />
            </span>
          </div>

          {/* Ads stage */}
          <div className="relative z-10 flex items-stretch gap-5">
            <div ref={adRef} className="h-[539px] w-[375px] overflow-hidden rounded-[11px] bg-[#c3c3c3]">
              <img src={signalsAd} alt="Generated MINI Cooper ad" className="size-full object-cover" draggable={false} />
            </div>
            <div className="flex items-end">
              <VLabel>Ads</VLabel>
            </div>
          </div>
        </div>

        {/* mobile stacked */}
        <div className="mt-10 flex flex-col gap-10 lg:hidden">
          <div>
            <p className="mb-4 font-body text-2xl font-extrabold text-[#444]">Signals</p>
            <div className="flex flex-wrap gap-2">
              {SIGNALS.map((s) => (
                <span key={s} className="rounded-[12px] bg-[#f5f3ff] px-3 py-1.5 font-display text-[14px] text-[#444]">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-body text-2xl font-extrabold text-[#444]">Insights</p>
            <div className="flex flex-col gap-4">
              {INSIGHTS.map(([title, body], i) => (
                <div key={title} className="flex flex-col gap-1 transition-colors duration-500">
                  <p className={`font-display text-[16px] font-bold ${i === active ? "text-[#444]" : "text-[#888]"}`}>
                    {title}
                  </p>
                  <p className={`font-display text-[14px] ${i === active ? "text-[#444]" : "text-[#888]"}`}>{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 font-body text-2xl font-extrabold text-[#444]">Ads</p>
            <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[11px] bg-[#c3c3c3]">
              <img src={signalsAd} alt="Generated MINI Cooper ad" className="w-full object-cover" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
