import sunfeast from "../../imports/5Jun/logos/sunfeast.png";
import reckitt from "../../imports/5Jun/logos/reckitt.png";
import cocacola from "../../imports/5Jun/logos/cocacola.png";
import bigbasket from "../../imports/5Jun/logos/bigbasket.png";
import kapiva from "../../imports/5Jun/logos/kapiva.png";
import lifelong from "../../imports/5Jun/logos/lifelong.png";

/**
 * Animation #2b — infinite logo marquee (per Figma node 1014:1581: a ~51px-tall
 * logo strip that overflows the viewport and scrolls).
 * Logos repeat with UNIFORM spacing so the band reads as one continuous stream
 * rather than visibly-repeating groups. It's contained within the centered
 * content column (not full-bleed) with an edge-fade mask. Two identical halves
 * make the -50% loop seamless. CSS pauses on hover / freezes for reduced motion.
 */
const LOGOS = [
  { src: sunfeast, h: 46, alt: "Sunfeast" },
  { src: reckitt, h: 34, alt: "Reckitt" },
  { src: cocacola, h: 25, alt: "Coca-Cola" },
  { src: bigbasket, h: 30, alt: "BigBasket" },
  { src: kapiva, h: 25, alt: "Kapiva" },
  { src: lifelong, h: 25, alt: "Lifelong" },
];

// repeat the set enough times to overflow the content column on wide screens
const HALF = [...LOGOS, ...LOGOS, ...LOGOS];
const TRACK = [...HALF, ...HALF]; // two identical halves → seamless -50% loop

export default function TrustedLogos() {
  return (
    <section className="bg-white py-9 sm:py-11">
      <div className="mx-auto max-w-[1040px] px-6">
        <div className="marquee-mask edge-fade relative overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-x-16">
            {TRACK.map((l, i) => (
              <img
                key={i}
                src={l.src}
                alt={i < LOGOS.length ? l.alt : ""}
                aria-hidden={i >= LOGOS.length}
                style={{ height: l.h }}
                className="w-auto shrink-0 opacity-60"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
