import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { fadeUp, revealViewport } from "../lib/motion";
import contentImg from "../../imports/5Jun/creativity/content.png";
import creatorsImg from "../../imports/5Jun/creativity/creators.png";
import commerceImg from "../../imports/5Jun/creativity/commerce.png";

const DESC = "Create content across formats and creative narratives, across the funnel campaigns";

const CARDS = [
  { key: "content", label: "CONTENT", img: contentImg, options: ["Hero Films", "Performance Ads", "Hygiene Content", "Social Media Content", "Integrated Campaigns"] },
  { key: "creators", label: "CREATORS", img: creatorsImg, options: ["Creator Chemistry", "On-Brand ideas and scripts", "Collab Ideas", "Brand IP"] },
  { key: "commerce", label: "COMMERCE", img: commerceImg, options: ["PDP Content", "A+ Content", "Quick Commerce Content", "Other Marketplaces"] },
] as const;

const IMG_EXPANDED = 400;
const IMG_COLLAPSED = 108;

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const f = () => setD(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return d;
}

function Arrow({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={active ? "#FE5C2B" : "#9a9a9a"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Card({ card, expanded, animate }: { card: (typeof CARDS)[number]; expanded: boolean; animate: boolean }) {
  const [opt, setOpt] = useState(0);
  const trans = { duration: animate ? 0.45 : 0, ease: [0.4, 0, 0.2, 1] as const };

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 ${
        expanded ? "border-black/8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)]" : "border-black/6"
      }`}
    >
      <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[360px_1fr] lg:gap-10">
        {/* left: label + desc + (options when expanded) */}
        <div className="flex flex-col">
          <h3 className="font-body text-2xl font-semibold tracking-[0.04em] text-[#444]">{card.label}</h3>
          <p className="mt-3 max-w-[330px] font-display text-[15px] leading-relaxed text-neutral-500">{DESC}</p>
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={trans}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-3.5 pt-6">
              {card.options.map((o, i) => {
                const isOn = i === opt;
                return (
                  <li key={o}>
                    <button
                      onClick={() => setOpt(i)}
                      className={`flex items-center gap-2 font-body text-lg transition-colors ${
                        isOn ? "font-medium text-[#FE5C2B]" : "text-[#444] hover:text-black"
                      }`}
                    >
                      {o}
                      <Arrow active={isOn} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* right: collage — collapses to a thin strip, expands to full */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? IMG_EXPANDED : IMG_COLLAPSED }}
          transition={trans}
          className="overflow-hidden rounded-xl bg-[#faf9fe]"
        >
          <img src={card.img} alt={`${card.label} examples`} className="h-full w-full object-cover" draggable={false} />
        </motion.div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="container-juice flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <h2 className="font-body text-[clamp(2.5rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#333]">
        Creativity
        <br />
        that converts
      </h2>
      <p className="max-w-[280px] font-display text-base text-neutral-500 lg:pb-2">
        No tool hopping, no experimenting. Just a team of agents who get it.
      </p>
    </motion.div>
  );
}

export default function Creativity() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const interactive = isDesktop && !reduce;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!interactive) return;
    setActive(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
  });

  return (
    <section id="creativity" className="bg-white pt-20 pb-20 sm:pt-24 sm:pb-24">
      <Heading />

      {/* ref is ALWAYS attached so useScroll can measure. On desktop the track
          is 280vh and the cards pin (sticky) and swap the active card by scroll
          progress (#4). On mobile / reduced-motion every card stays expanded. */}
      <div ref={ref} className="mt-12 lg:relative lg:mt-14 lg:h-[280vh]">
        <div className="lg:sticky lg:top-[96px]">
          <div className="container-juice flex flex-col gap-5">
            {CARDS.map((c, i) => (
              <Card key={c.key} card={c} expanded={!interactive || i === active} animate={interactive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
