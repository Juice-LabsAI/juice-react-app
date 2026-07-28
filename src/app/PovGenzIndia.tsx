import { useEffect, useRef } from "react";
import logoSrc from "../imports/pov/genz-logo.png";
import { GENZ_CSS, GENZ_MARKUP } from "./pov/genzIndiaContent";
// @ts-expect-error — plain-ESM config, shared with scripts/prerender-meta.mjs
import { SITE_META, routeMeta } from "../../seo.config.mjs";

/**
 * POV — "The First Generation That Doesn't Need You" (Gen Z India).
 *
 * A faithful mount of the approved standalone HTML export. The markup and CSS
 * live verbatim in ./pov/genzIndiaContent.ts and are injected here, so the page
 * renders byte-identically to the signed-off design. The original inline
 * <script> is ported below into a single effect: scroll progress, reveal
 * animations, active nav station, the three easter eggs, and the hero glitch.
 *
 * The stylesheet, the Google Font links, the document title/description and the
 * body `maxneon` class are all mounted with the route and torn down on unmount,
 * so nothing leaks into the rest of the site.
 */

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap";

const PAGE_META = routeMeta("/pov/genz-india");

/** Load the report's own font stack, and remove it again on unmount. */
function useReportFonts() {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    const add = (attrs: Record<string, string>) => {
      const l = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => l.setAttribute(k, v));
      document.head.appendChild(l);
      links.push(l);
    };
    add({ rel: "preconnect", href: "https://fonts.googleapis.com" });
    add({ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" });
    add({ rel: "stylesheet", href: FONTS_HREF });
    return () => links.forEach((l) => l.remove());
  }, []);
}

/**
 * Swap in the report's title/description while the route is mounted.
 *
 * Social crawlers are served the prerendered dist/pov/genz-india/index.html, which
 * already carries these tags — this effect is for humans arriving via client-side
 * navigation, where no new document is ever fetched. It restores the site defaults
 * rather than "whatever was there before", because on a direct hit the document
 * already opens with the report's title and restoring that would leave the wrong
 * name in the tab after navigating away.
 */
function useReportMeta() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    document.title = PAGE_META.title;
    if (meta) meta.content = PAGE_META.description;

    return () => {
      document.title = SITE_META.title;
      if (meta) meta.content = SITE_META.description;
    };
  }, []);
}

export default function PovGenzIndia() {
  useReportFonts();
  useReportMeta();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);

    /* ---- scroll progress + loco ---- */
    const fill = q<HTMLElement>("#track .fill");
    const loco = q<HTMLElement>("#track .loco");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (fill) fill.style.width = p + "%";
      if (loco) loco.style.left = p + "%";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => document.removeEventListener("scroll", onScroll));
    onScroll();

    /* ---- reveals ---- */
    const rvs = Array.from(root.querySelectorAll<HTMLElement>(".rv"));
    if ("IntersectionObserver" in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      rvs.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      rvs.forEach((el) => el.classList.add("in"));
    }

    /* ---- active nav station ---- */
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("nav .stations a"));
    const secs: { a: HTMLAnchorElement; s: HTMLElement }[] = [];
    links.forEach((a) => {
      const id = (a.getAttribute("href") || "").slice(1);
      const s = id ? document.getElementById(id) : null;
      if (s) secs.push({ a, s });
    });
    const navIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove("on"));
            const m = secs.find((x) => x.s === e.target);
            if (m) {
              m.a.classList.add("on");
              m.a.scrollIntoView({
                block: "nearest",
                inline: "center",
                behavior: reduced ? "auto" : "smooth",
              });
            }
          }
        }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    secs.forEach((x) => navIO.observe(x.s));
    cleanups.push(() => navIO.disconnect());

    /* ---- toast helper ---- */
    const toast = q<HTMLElement>("#eggToast");
    let toastT: ReturnType<typeof setTimeout> | undefined;
    const say = (msg: string) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(toastT);
      toastT = setTimeout(() => toast.classList.remove("show"), 2800);
    };
    cleanups.push(() => clearTimeout(toastT));

    /* ---- train run ---- */
    const train = q<HTMLElement>("#train");
    const runTrain = () => {
      if (reduced || !train) return;
      train.classList.remove("go");
      void train.offsetWidth;
      train.classList.add("go");
    };

    /* ---- EGG 1: horn button in footer ---- */
    let horns = 0;
    const hornBtn = q<HTMLElement>("#hornBtn");
    const onHorn = () => {
      horns++;
      runTrain();
      say(
        horns >= 3
          ? "🚈 Fast local, skipping all stops. You found egg 1/3."
          : "🚈 Virar fast approaching. Please mind the gap.",
      );
    };
    hornBtn?.addEventListener("click", onHorn);
    cleanups.push(() => hornBtn?.removeEventListener("click", onHorn));

    /* ---- EGG 2: Soan Papdi click ---- */
    const papdi = q<HTMLElement>("#papdi");
    const pw = q<HTMLElement>("#papdiWord");
    const onPapdi = (e: MouseEvent) => {
      if (!papdi) return;
      papdi.style.left = e.clientX + "px";
      papdi.style.top = e.clientY + "px";
      papdi.classList.remove("fly");
      void papdi.offsetWidth;
      papdi.classList.add("fly");
      say("🍬 Re-gifted successfully. Chief Comeback Officer approves. Egg 2/3.");
    };
    pw?.addEventListener("click", onPapdi);
    cleanups.push(() => pw?.removeEventListener("click", onPapdi));

    /* ---- EGG 3: Konami code → MAX NEON ---- */
    const seq = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
    ];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[pos]) pos++;
      else pos = k === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        document.body.classList.toggle("maxneon");
        runTrain();
        say(
          document.body.classList.contains("maxneon")
            ? "⚡ MAX NEON unlocked. Egg 3/3 — the line is yours."
            : "Neon back to regulation levels.",
        );
      }
    };
    document.addEventListener("keydown", onKey);
    cleanups.push(() => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("maxneon");
    });

    /* ---- hero title glitch on click ---- */
    const ht = q<HTMLElement>("#heroTitle");
    let clicks = 0;
    let clickT: ReturnType<typeof setTimeout> | undefined;
    const onHero = () => {
      clicks++;
      clearTimeout(clickT);
      clickT = setTimeout(() => (clicks = 0), 600);
      if (!reduced && ht) {
        ht.classList.remove("burst");
        void ht.offsetWidth;
        ht.classList.add("burst");
      }
      if (clicks === 3) {
        say("Pattern recognition: confirmed.");
        clicks = 0;
      }
    };
    ht?.addEventListener("click", onHero);
    cleanups.push(() => {
      ht?.removeEventListener("click", onHero);
      clearTimeout(clickT);
    });

    /* ---- console note ---- */
    console.log(
      "%c🚈 NEO-MUMBAI LINE %c\nYou read the source. Very Gen Z of you.\nReport by Juice AI — www.juicelabs.ai\nEggs: horn (footer) · soan papdi (part six) · ↑↑↓↓←→←→BA",
      "font-family:monospace;font-size:16px;color:#00e5ff;background:#0d0b1e;padding:6px 10px;border:1px solid #ff2d95;",
      "font-family:monospace;color:#ffb800;",
    );

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GENZ_CSS }} />
      <div
        ref={rootRef}
        dangerouslySetInnerHTML={{ __html: GENZ_MARKUP.replaceAll("__LOGO_SRC__", logoSrc) }}
      />
    </>
  );
}
