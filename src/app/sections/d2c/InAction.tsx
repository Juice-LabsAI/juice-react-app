import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import bottle from "../../../imports/d2c/action-bottle.png";
import pack from "../../../imports/d2c/action-pack.png";

/* "Let's see in action" (Figma 624:306102). The section pins; the right column
   of steps scrolls inside a fixed window (top/bottom white fades), while the
   left product image stays put and swaps in one go to the active step's image
   the moment that step's header crosses the window's vertical centre. Stacks on
   mobile / reduced-motion. */

const PURPLE = "#9165f5";

type Step = {
  n: string;
  label: string;
  color: string;
  title: string;
  img: string;
  lead?: string[];
  leadBold?: string[];
  body?: string[];
  foot?: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    label: "POSITIONING",
    color: PURPLE,
    img: bottle,
    title: "It starts with a sharp position.",
    lead: ["What are you?", "Who is it for?", "Why should anyone care?"],
    body: [
      "Juice turns your inputs into a positioning statement that actually holds. Your name, your visuals, your copy, your targeting, all of it flows from here.",
    ],
    foot: "Done in under an hour",
  },
  {
    n: "02",
    label: "NAMING",
    color: "#8948de",
    img: pack,
    title: "Then a name that earns its spot",
    body: [
      "Juice generates name candidates scored against your positioning, category, and competitive set. Domain availability. Social handle checks. Trademark flags.",
      "Pick the one. Lock it in. Move on.",
    ],
  },
  {
    n: "03",
    label: "VISUAL IDENTITY",
    color: PURPLE,
    img: bottle,
    title: "Then a brand that looks like it cost $40K.",
    lead: ["Logo.", "Color system.", "Typography.", "Photography direction."],
    body: [
      "A complete brand book, generated from your positioning and category, not a generic template.",
      "Refine until it's right. Export production-ready files. Hand it to anyone and they'll know exactly how to use your brand.",
    ],
  },
  {
    n: "04",
    label: "PACKAGING",
    color: PURPLE,
    img: pack,
    title: "Then packaging that's ready for the printer.",
    body: [
      "Juice designs packaging that runs on your brand system. Not a mockup you'll need to rebuild — actual production-ready dielines, built to your specs.",
      "From screen to shelf. No design agency in between.",
    ],
  },
  {
    n: "05",
    label: "BRAND STORY",
    color: PURPLE,
    img: bottle,
    title: "Then create a story that sounds like you",
    leadBold: ["Origin story", "Mission", "Tone of voice", "Key messages"],
    body: [
      "Juice writes them in the voice you've defined, from the inputs you've given.",
      "This is the copy that lives on your site, in your emails, in your pitch deck, in every creator brief you send.",
    ],
    foot: "Written once. Used everywhere — because it's all connected to the same source.",
  },
  {
    n: "06",
    label: "LAUNCH PLAN",
    color: PURPLE,
    img: pack,
    title: "Then you launch.",
    leadBold: ["Content", "Creators", "Commerce"],
    body: ["planned, built, and coordinated in Juice before you ship a single unit."],
  },
  {
    n: "07",
    label: "LAUNCH CONTENT",
    color: PURPLE,
    img: bottle,
    title: "30 days of content. Built before day one.",
    leadBold: ["Social calendar", "Email sequences", "Ad creative"],
    body: [
      "All generated in Juice, all on-brand — because Juice already knows your positioning, your voice, your visual system.",
      "Launch day isn't a scramble. It's a switch you flip.",
    ],
  },
  {
    n: "08",
    label: "CREATORS",
    color: PURPLE,
    img: pack,
    title: "Creators who actually fit. Briefs they can actually use.",
    body: [
      "Juice matches you with creators whose audiences overlap with yours. Builds the briefs so they know exactly what to make. Tracks deliverables and timelines.",
      "Launch day, they post. Coordinated with your content.",
    ],
    foot: "Coordinated with your ads. Not a hope — a plan.",
  },
  {
    n: "09",
    label: "COMMERCE",
    color: PURPLE,
    img: bottle,
    title: "Every click points somewhere that converts.",
    body: [
      "Juice points every click somewhere that converts — PDPs, A+ content, quick-commerce tiles, marketplace listings, all built on the same brand system.",
      "From first impression to add-to-cart, nothing breaks the thread.",
    ],
    foot: "On-brand everywhere you sell.",
  },
];

const IMAGES = [bottle, pack];

/* both panels (image + text window) share this height */
const PANEL = "min(560px, calc(100dvh - 300px))";

function StepBlock({ step }: { step: Step }) {
  return (
    <div className="flex w-full max-w-[565px] flex-col gap-4">
      <div className="flex items-end gap-3" style={{ color: step.color }} data-header>
        <span className="font-body text-[32px] font-normal leading-none">{step.n}</span>
        <span className="font-body text-[20px] font-semibold uppercase leading-none">{step.label}</span>
      </div>
      <div className="flex gap-[35px]">
        <div className="w-[3px] shrink-0 self-stretch overflow-hidden rounded-full bg-[#ededed]">
          <div className="h-10 w-full rounded-full" style={{ background: step.color }} />
        </div>
        <div className="flex flex-col gap-5 pt-1">
          <h3 className="max-w-[488px] font-body text-[clamp(1.75rem,2.6vw,2.75rem)] font-bold leading-[1.04] text-[#535353]">
            {step.title}
          </h3>
          <div className="h-px w-[41px] bg-[#cfcfcf]" />
          {step.lead && (
            <div className="font-display text-[15px] font-medium leading-[1.5] text-[#444]">
              {step.lead.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          )}
          {step.leadBold && (
            <div className="font-display text-[15px] font-bold leading-[1.5] text-[#444]">
              {step.leadBold.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          )}
          {step.body?.map((p) => (
            <p key={p} className="max-w-[443px] font-display text-[15px] leading-[1.5] text-[#535353]">
              {p}
            </p>
          ))}
          {step.foot && (
            <p className="max-w-[443px] font-display text-[15px] leading-[1.5] text-[#535353]">{step.foot}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const Heading = (
  <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:gap-[42px]">
    <h2 className="font-body text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[0.9] text-[#444]">
      Let&rsquo;s see
      <br />
      it in action
    </h2>
    <p className="max-w-[266px] font-display text-[20px] font-medium leading-[1.41] text-[#444]">
      No tool hopping, no experimenting. Just a team of agents who get it.
    </p>
  </div>
);

export default function InAction() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const travel = useRef(0);
  const centers = useRef<number[]>([]); // each header's centre offset within the column
  const [pinH, setPinH] = useState(0);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useLayoutEffect(() => {
    const measure = () => {
      const on =
        window.matchMedia("(min-width: 1024px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setEnabled(on);
      if (!on) {
        setPinH(0);
        return;
      }
      const panelH = panelRef.current?.clientHeight ?? 0;
      const col = colRef.current;
      const colH = col?.scrollHeight ?? 0;
      travel.current = Math.max(0, colH - panelH);
      if (col) {
        centers.current = [...col.querySelectorAll<HTMLElement>("[data-header]")].map(
          (el) => el.offsetTop + el.offsetHeight / 2,
        );
      }
      setPinH(window.innerHeight + travel.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (colRef.current) ro.observe(colRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const colY = useTransform(scrollYProgress, (p) => -p * travel.current);

  // discrete swap: active = last header whose centre has reached the window centre
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const panelH = panelRef.current?.clientHeight ?? 0;
    const focus = p * travel.current + panelH / 2;
    let idx = 0;
    for (let i = 0; i < centers.current.length; i++) {
      if (centers.current[i] <= focus) idx = i;
    }
    if (idx !== active) setActive(idx);
  });

  if (!enabled) {
    // mobile / reduced-motion: stacked, each step shows its own image
    return (
      <section className="bg-white py-16">
        <div className="container-juice">
          {Heading}
          <div className="flex flex-col gap-14">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col gap-5">
                <div className="overflow-hidden rounded-xl bg-[#5e25cf]">
                  <img src={s.img} alt="" className="aspect-[4/3] w-full object-cover" draggable={false} />
                </div>
                <StepBlock step={s} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activeImg = STEPS[active].img;

  return (
    <section ref={sectionRef} className="relative bg-white" style={{ height: pinH || undefined }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center pb-6 pt-[96px]">
        <div className="container-juice">
          {Heading}
          <div className="grid grid-cols-2 gap-8">
            {/* LEFT — pinned image, swaps discretely */}
            <div
              className="relative overflow-hidden rounded-xl bg-[#5e25cf]"
              style={{ height: PANEL }}
            >
              {IMAGES.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-0 size-full select-none object-cover"
                  style={{
                    opacity: src === activeImg ? 1 : 0,
                    transition: reduce ? "none" : "opacity 0.35s ease",
                  }}
                />
              ))}
            </div>

            {/* RIGHT — text scrolls inside this fixed window, fading at the edges */}
            <div ref={panelRef} className="relative overflow-hidden" style={{ height: PANEL }}>
              <motion.div
                ref={colRef}
                style={{ y: colY, paddingTop: "64px", paddingBottom: "96px" }}
                className="flex flex-col gap-12"
              >
                {STEPS.map((s) => (
                  <StepBlock key={s.n} step={s} />
                ))}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
