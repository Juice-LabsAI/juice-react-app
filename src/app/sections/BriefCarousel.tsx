import { useEffect, useRef } from "react";
import { CAROUSEL_CSS, CAROUSEL_HTML } from "./briefCarouselContent";

// Task 8 — replaces the old "Start your first campaign!" / "Juice campaign
// templates" section with the Figma carousel (node 1125-1188). The markup, CSS
// and behaviour are ported verbatim from the client's Webflow export so it looks
// and animates exactly as it did there; only the wrapper (dotted purple bg) and
// the vanilla-JS wiring (adapted to run inside React, scoped to this section's
// root and cleaned up on unmount) are ours.

type SlideState = { timers: number[]; running: boolean };

export default function BriefCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // The Webflow export has one unbalanced </div>, so when parsed the browser
    // closes .main-slider early and the next-arrow + dots end up as siblings of
    // the full-width wrapper — which throws the arrow's `right:-5%` off-screen.
    // Reparent them into .main-slider so both nav arrows position off its edges.
    const mainSlider = root.querySelector(".main-slider");
    if (mainSlider) {
      root.querySelectorAll<HTMLElement>(".right-arrow-1, .slider-dots").forEach((elm) => {
        if (elm.parentElement !== mainSlider) mainSlider.appendChild(elm);
      });
    }

    /* ---------------- typing engine (Webflow script 3) ---------------- */
    const TYPE_BASE = 10;
    const PAUSE_LINE = 320;

    const decodeHTML = (s: string) => {
      const t = document.createElement("textarea");
      t.innerHTML = s || "";
      return t.value;
    };

    const registry = new WeakMap<HTMLElement, SlideState>();
    const getState = (slide: HTMLElement): SlideState =>
      registry.get(slide) || { timers: [], running: false };
    const pushTimer = (slide: HTMLElement, tid: number) => {
      const st = getState(slide);
      st.timers.push(tid);
      registry.set(slide, st);
    };
    const setRunning = (slide: HTMLElement, val: boolean) => {
      const st = getState(slide);
      st.running = val;
      registry.set(slide, st);
    };
    const isRunning = (slide: HTMLElement) => !!registry.get(slide)?.running;

    const resetSlide = (slide: HTMLElement) => {
      if (!slide) return;
      getState(slide).timers.forEach((tid) => clearTimeout(tid));
      registry.set(slide, { timers: [], running: false });
      const briefTextEl = slide.querySelector<HTMLElement>(".brief-text");
      const ideaOuter = slide.querySelector<HTMLElement>(".idea-outer");
      const ideaCard = slide.querySelector<HTMLElement>(".idea-card");
      const briefBubble = slide.querySelector<HTMLElement>(".brief-bubble");
      const briefCenter = slide.querySelector<HTMLElement>(".brief-center");
      if (briefTextEl) briefTextEl.textContent = "";
      ideaOuter?.classList.remove("show");
      ideaCard?.classList.remove("revealed");
      briefBubble?.classList.remove("connector-visible");
      if (briefCenter) {
        briefCenter.style.opacity = "";
        briefCenter.style.transform = "";
      }
    };

    const startTypingOnSlide = (slide: HTMLElement) => {
      if (!slide) return;
      resetSlide(slide);

      let raw = slide.dataset.typeText || "";
      raw = decodeHTML(raw)
        .replace(/\r|\t/g, " ")
        .replace(/\\/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      const briefTextEl = slide.querySelector<HTMLElement>(".brief-text");
      const ideaCard = slide.querySelector<HTMLElement>(".idea-card");
      const ideaOuter = slide.querySelector<HTMLElement>(".idea-outer");
      const briefBubble = slide.querySelector<HTMLElement>(".brief-bubble");
      if (!briefTextEl) return;

      briefTextEl.textContent = "";
      const textNode = document.createTextNode("");
      briefTextEl.appendChild(textNode);

      let i = 0;
      setRunning(slide, true);

      // Show the idea card as soon as typing begins.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          ideaOuter?.classList.add("show");
          ideaCard?.classList.add("revealed");
        }),
      );

      const step = () => {
        if (!isRunning(slide)) return;

        if (i >= raw.length) {
          const cursor = document.createElement("span");
          cursor.className = "brief-cursor";
          briefTextEl.appendChild(cursor);
          briefBubble?.classList.add("connector-visible");

          const t1 = window.setTimeout(() => {
            ideaOuter?.classList.add("show");
            const t2 = window.setTimeout(() => {
              ideaCard?.classList.add("revealed");
              const t3 = window.setTimeout(() => cursor.remove(), 220);
              pushTimer(slide, t3);
            }, 220);
            pushTimer(slide, t2);
          }, 650);
          pushTimer(slide, t1);

          const tFinish = window.setTimeout(() => setRunning(slide, false), 2000);
          pushTimer(slide, tFinish);
          return;
        }

        const ch = raw[i++];
        if (ch === "\n") {
          textNode.nodeValue = (textNode.nodeValue || "") + "\n";
          pushTimer(slide, window.setTimeout(step, PAUSE_LINE));
        } else {
          textNode.nodeValue = (textNode.nodeValue || "") + ch;
          pushTimer(slide, window.setTimeout(step, TYPE_BASE + Math.random() * 13));
        }
      };

      pushTimer(slide, window.setTimeout(step, 500));
    };

    const onSlideChanged = (ev: Event) => {
      const newSlide = (ev as CustomEvent).detail?.slide as HTMLElement | undefined;
      if (!newSlide) return;
      root.querySelectorAll<HTMLElement>(".prompt-wrap").forEach((s) => {
        if (s !== newSlide) resetSlide(s);
      });
      startTypingOnSlide(newSlide);
    };
    root.addEventListener("slideChanged", onSlideChanged);

    /* ---------------- slider nav + dots + autoplay (script 1) ---------------- */
    const slides = root.querySelectorAll<HTMLElement>(".prompt-wrap");
    const nextBtn = root.querySelector<HTMLButtonElement>(".slider-btn.next");
    const prevBtn = root.querySelector<HTMLButtonElement>(".slider-btn.prev");
    const dotsContainer = root.querySelector<HTMLElement>(".slider-dots");
    const total = slides.length;
    let current = 0;

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.dataset.index = String(index);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer?.appendChild(dot);
    });
    const dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];

    function updateSlider() {
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("active-dot", i === current));
      root!.dispatchEvent(
        new CustomEvent("slideChanged", { detail: { slide: slides[current], index: current } }),
      );
    }
    function goToSlide(index: number) {
      current = index;
      updateSlider();
    }
    function nextSlide() {
      current = (current + 1) % total;
      updateSlider();
    }
    function prevSlide() {
      current = (current - 1 + total) % total;
      updateSlider();
    }

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);
    const auto = window.setInterval(nextSlide, 25000);

    /* ---------------- drag / swipe (script 2) ---------------- */
    const wrapper = root.querySelector<HTMLElement>(".prompt-wrap")?.parentElement ?? null;
    let startX = 0;
    let endX = 0;
    const detectSwipe = () => {
      const diff = endX - startX;
      if (Math.abs(diff) < 50) return;
      if (diff < 0) nextSlide();
      else prevSlide();
    };
    const onDown = (e: MouseEvent) => (startX = e.clientX);
    const onUp = (e: MouseEvent) => {
      endX = e.clientX;
      detectSwipe();
    };
    const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      detectSwipe();
    };
    if (wrapper) {
      wrapper.addEventListener("mousedown", onDown);
      wrapper.addEventListener("mouseup", onUp);
      wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
      wrapper.addEventListener("touchend", onTouchEnd);
    }

    updateSlider(); // kick off slide 0 (this dispatches slideChanged → typing starts)

    return () => {
      clearInterval(auto);
      root.removeEventListener("slideChanged", onSlideChanged);
      if (wrapper) {
        wrapper.removeEventListener("mousedown", onDown);
        wrapper.removeEventListener("mouseup", onUp);
        wrapper.removeEventListener("touchstart", onTouchStart);
        wrapper.removeEventListener("touchend", onTouchEnd);
      }
      slides.forEach(resetSlide);
    };
  }, []);

  return (
    <section
      id="campaign"
      className="dot-grid overflow-x-hidden bg-[#f5f3ff] py-20 sm:py-24 lg:py-28"
    >
      <style>{CAROUSEL_CSS}</style>
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: CAROUSEL_HTML }} />
    </section>
  );
}
