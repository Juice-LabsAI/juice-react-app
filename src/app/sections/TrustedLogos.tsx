import itc from "../../imports/jul3/logos/itc.png";
import sunfeast from "../../imports/jul3/logos/sunfeast.png";
import aashirvaad from "../../imports/jul3/logos/aashirvaad.png";
import fabelle from "../../imports/jul3/logos/fabelle.png";
import reckitt from "../../imports/jul3/logos/reckitt.png";
import cocacola from "../../imports/jul3/logos/coca-cola.png";
import kapiva from "../../imports/jul3/logos/kapiva.png";
import mapro from "../../imports/jul3/logos/mapro.png";
import lifelong from "../../imports/jul3/logos/lifelong.png";

/**
 * Animation #2b — infinite logo marquee (per Figma node 1014:1581: a ~51px-tall
 * logo strip that overflows the viewport and scrolls).
 * Logos repeat with UNIFORM spacing so the band reads as one continuous stream
 * rather than visibly-repeating groups. It's contained within the centered
 * content column (not full-bleed) with an edge-fade mask. Two identical halves
 * make the -50% loop seamless. CSS pauses on hover / freezes for reduced motion.
 */
const LOGOS = [
  { src: itc, h: 40, alt: "ITC" },
  { src: sunfeast, h: 42, alt: "Sunfeast" },
  { src: aashirvaad, h: 34, alt: "Aashirvaad" },
  { src: fabelle, h: 30, alt: "Fabelle" },
  { src: reckitt, h: 30, alt: "Reckitt" },
  { src: cocacola, h: 26, alt: "Coca-Cola" },
  { src: kapiva, h: 25, alt: "Kapiva" },
  { src: mapro, h: 30, alt: "Mapro" },
  { src: lifelong, h: 24, alt: "Lifelong" },
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
