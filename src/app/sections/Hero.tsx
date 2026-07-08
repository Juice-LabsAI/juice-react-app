import { useEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import heroVideoPoster from "../../imports/hero-v1-poster.png";

// The hero video lives at public/hero.mp4 (served at /hero.mp4) — a raw motion
// graphic with no border, so the yellow frame is recreated in CSS. Until the file
// exists the poster shows and the sticky-video behaviour stays off.
const HERO_VIDEO_SRC = "/hero.mp4";
const VIDEO_ASPECT = 1920 / 1162; // source clip aspect ratio

// Scroll-scrubbed phases (progress 0 → 1 over a tall pinned track):
//   0 … RISE_END   the yellow-framed card rises from a bottom peek up to the navbar
//   RISE_END … EXPAND_END   its top reaches the navbar and it grows to a full-screen
//                            "spotlight" — yellow frame on all four viewport edges
//   at EXPAND_END  the video autoplays and the page holds (sticky) until it ends /
//                  you scroll far enough / you hit skip; scrolling up shrinks it back.
const RISE_END = 0.34; // peek → rest at the navbar
const EXPAND_END = 0.54; // rest → full-viewport spotlight (video autoplays / holds here)
const SHRINK_END = 0.82; // spotlight → back down to the normal card size as you scroll on
const REARM_BELOW = 0.2; // once clear of the spotlight, stickiness re-arms
// Snap thresholds: scroll grows/shrinks the frame manually for the first 25%, then it
// auto-completes the remaining 75% (the spring animates it once we jump scroll to the
// phase end). 25% of the grow range, and 25% of the shrink range.
const GROW_SNAP_AT = RISE_END + 0.25 * (EXPAND_END - RISE_END); // 0.39
const SHRINK_SNAP_AT = EXPAND_END + 0.25 * (SHRINK_END - EXPAND_END); // 0.61
const SKIP_SCROLL = 2200; // px of extra scrolling needed to break out while it plays
const SETTLE_MS = 750; // ignore the entering scroll's momentum this long before counting an escape
const HOLD_TIMEOUT = 130000; // ms — fallback release if the video's duration is unknown
const HERO_ALT = "Juice — AI that builds ads engineered to outperform";

const NAV_TOP = 86; // navbar height — where the frame's top comes to rest before expanding

// Yellow frame colour (matches the original: #FFD950).
const FRAME = "overflow-hidden rounded-[clamp(18px,2vw,34px)] bg-[#FFD950] p-[3.4%]";
const FRAME_INNER = "block w-full rounded-[clamp(11px,1.3vw,22px)]";

function useIsDesktop() {
  const [d, setD] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const f = () => setD(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return d;
}

function useViewport() {
  // Width uses clientWidth (excludes the scrollbar): the pinned frame lives inside
  // an overflow-hidden container that is only clientWidth wide, so sizing the
  // spotlight to innerWidth would push its right edge (and yellow border) under the
  // clip. Height uses innerHeight to match the `h-screen` (100vh) container.
  const read = () => ({
    w: typeof document !== "undefined" ? document.documentElement.clientWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  });
  const [vp, setVp] = useState(read);
  useEffect(() => {
    const f = () => setVp(read());
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return vp;
}

/* Headline gradient sweep (light band passes L→R) — the hero's dominant focus. */
function Headline({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className={`font-body font-extrabold leading-[0.9] tracking-[-0.01em] text-[#444444] [word-break:break-word] ${className}`}>
      <motion.span
        style={
          reduce
            ? { color: "#444444" }
            : {
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage:
                  "linear-gradient(90deg, #444444 0%, #444444 42%, #d6d6d6 50%, #444444 58%, #444444 100%)",
                backgroundSize: "300% 100%",
              }
        }
        initial={reduce ? undefined : { backgroundPosition: "0% 0" }}
        animate={reduce ? undefined : { backgroundPosition: "100% 0" }}
        transition={{ duration: 2.1, ease: [0.16, 1, 0.3, 1] }}
      >
        The Brand OS
        <br />
        that generates content that outperforms
      </motion.span>
    </h1>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const interactive = isDesktop && !reduce;
  const vp = useViewport();

  // Card (resting) geometry — matched to .container-juice (max-width 1440,
  // padding clamp(20px, 3.6vw, 52px)) so the framed video lines up exactly with
  // the headline and every other section. The spotlight geometry is the full viewport.
  const containerW = Math.min(1440, vp.w);
  const sidePad = Math.max(20, Math.min(vp.w * 0.036, 52));
  const cardW = containerW - sidePad * 2;
  const cardPad = cardW * 0.03;
  const cardH = (cardW - cardPad * 2) / VIDEO_ASPECT + cardPad * 2;
  const centeredX = (vp.w - containerW) / 2 + sidePad;
  const spotPad = Math.max(16, Math.round(vp.w * 0.02));

  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Belt-and-suspenders autoplay for the mobile hero video: nudge play() on mount
  // and once it can play (some mobile browsers ignore the `autoplay` attribute).
  useEffect(() => {
    if (interactive || reduce) return;
    const v = mobileVideoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [interactive, reduce]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 26, restDelta: 0.0004 });

  // Frame morph: peek → rest at navbar → full-viewport spotlight → back to card.
  // The spotlight grows (RISE_END→EXPAND_END) and then shrinks back to the normal
  // card size (EXPAND_END→SHRINK_END) as you scroll on toward the next section.
  const frameTop = useTransform(p, [0, RISE_END, EXPAND_END, SHRINK_END], [vp.h * 0.7, NAV_TOP, 0, NAV_TOP]);
  const frameLeft = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [centeredX, 0, centeredX]);
  const frameW = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [cardW, vp.w, cardW]);
  const frameH = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [cardH, vp.h, cardH]);
  const frameRadius = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [30, 6, 30]);
  const framePad = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [cardPad, spotPad, cardPad]);
  const innerRadius = useTransform(p, [RISE_END, EXPAND_END, SHRINK_END], [18, 3, 18]);

  // Title floats up + fades as the frame rises over it, and returns as it shrinks back.
  const titleY = useTransform(p, [0, RISE_END, EXPAND_END, SHRINK_END], ["0vh", "-24vh", "-24vh", "0vh"]);
  const titleOpacity = useTransform(p, [0, RISE_END * 0.9, EXPAND_END, SHRINK_END], [1, 0, 0, 1]);

  // Once expansion begins the frame lifts above the navbar so the spotlight can own
  // all four viewport edges; shrinking back drops it below the navbar again.
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false); // true while the held video plays (shows the skip)

  // ---- sticky-video hold (same model as before, now triggered at full spotlight) ----
  const lockedRef = useRef(false);
  const playedRef = useRef(false);
  const accumRef = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishHoldRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!interactive) return;
    const v = videoRef.current;
    if (!v) return;

    let settleUntil = 0;
    let playStarted = false;
    let reachedSpotlight = false; // frame has finished growing to the full spotlight
    let snapCtrl: ReturnType<typeof animate> | null = null;

    // Drive the window scroll to a phase boundary and re-assert it every frame — a
    // single scrollTo can be overridden by trackpad momentum, so the frame would
    // never reach the target. scrollYProgress → spring p → the frame follows.
    const snapScroll = (progress: number) => {
      const track = trackRef.current;
      if (!track) return;
      const target = track.offsetTop + progress * (track.offsetHeight - window.innerHeight);
      snapCtrl?.stop();
      snapCtrl = animate(window.scrollY, target, {
        duration: 0.55,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (y) => window.scrollTo(0, y),
      });
    };

    const releaseHold = () => {
      lockedRef.current = false;
      accumRef.current = 0;
      playStarted = false;
      reachedSpotlight = false;
      snapCtrl?.stop();
      setPlaying(false);
      if (holdTimer.current) clearTimeout(holdTimer.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("keydown", onKey, true);
    };
    const finishHold = () => {
      playedRef.current = true;
      releaseHold();
    };
    finishHoldRef.current = finishHold;

    const bump = (amount: number) => {
      if (Date.now() < settleUntil) return;
      accumRef.current += amount;
      if (accumRef.current > SKIP_SCROLL) finishHold();
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return; // let upward scroll reverse / shrink the spotlight
      e.preventDefault();
      bump(e.deltaY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      bump(40);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        bump(200);
      }
    };
    const startPlayback = () => {
      if (playStarted || !lockedRef.current) return;
      playStarted = true;
      setPlaying(true);
      try { v.currentTime = 0; } catch { /* not seekable yet */ }
      const ms = isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 + 4000 : HOLD_TIMEOUT;
      holdTimer.current = setTimeout(finishHold, ms);
      v.play().catch(() => finishHold());
    };
    const engageHold = () => {
      lockedRef.current = true;
      reachedSpotlight = false;
      accumRef.current = 0;
      settleUntil = Date.now() + SETTLE_MS;
      // Snap the remaining 75% of the grow to the full spotlight.
      snapScroll(EXPAND_END);
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
      window.addEventListener("keydown", onKey, true);
      if (p.get() >= EXPAND_END - 0.01) startPlayback();
    };
    const onEnded = () => finishHold();
    const onError = () => finishHold();
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onError);

    // Instant jump (used for the exit shrink — the user is already scrolling down, so
    // re-asserting would fight them; overshooting past SHRINK_END just lands on the card).
    const snapTo = (progress: number) => {
      const track = trackRef.current;
      if (track) window.scrollTo(0, track.offsetTop + progress * (track.offsetHeight - window.innerHeight));
    };

    let lastVal = 0;
    const stop = scrollYProgress.on("change", (val) => {
      const prev = lastVal;
      lastVal = val;
      if (lockedRef.current) {
        // Only allow the scroll-up "reverse out" once the spotlight is fully reached —
        // otherwise the momentum passing through 0.39-0.44 during the grow-snap would
        // immediately release the lock before it finishes snapping.
        if (reachedSpotlight && val < EXPAND_END - 0.1) {
          releaseHold();
          v.pause();
          v.currentTime = 0;
        }
        return;
      }
      if (!playedRef.current && val >= GROW_SNAP_AT) {
        // grown past 25% → engageHold snaps scroll to the spotlight (animated so it
        // beats momentum) and the frame grows the remaining 75%, then the video plays.
        engageHold();
      } else if (playedRef.current && prev < SHRINK_SNAP_AT && val >= SHRINK_SNAP_AT && val < SHRINK_END) {
        // exit: shrunk past 25% (scrolling down) → snap the remaining 75% back to the card.
        // Guarded to the downward crossing so scrolling back up isn't yanked down again.
        snapTo(SHRINK_END);
      } else if (playedRef.current && val < REARM_BELOW) {
        playedRef.current = false;
      }
    });
    const stopP = p.on("change", (val) => {
      // Enlarged (above card size) → lift above the navbar; shrunk back → drop below it.
      setExpanded(val > RISE_END + 0.015 && val < SHRINK_END - 0.01);
      if (lockedRef.current && val >= EXPAND_END - 0.02) reachedSpotlight = true;
      if (lockedRef.current && !playStarted && val >= EXPAND_END - 0.01) startPlayback();
    });

    return () => {
      stop();
      stopP();
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onError);
      releaseHold();
    };
  }, [interactive, scrollYProgress, p]);

  const handleSkip = () => {
    finishHoldRef.current();
    const track = trackRef.current;
    if (track) window.scrollTo({ top: track.offsetTop + track.offsetHeight, behavior: "smooth" });
  };

  // ---- non-interactive (mobile / reduced motion) ----
  // There's no scroll-scrubbed spotlight here, so the framed video just autoplays
  // (muted + inline, so iOS/Android allow it). Reduced-motion users keep the poster.
  if (!interactive) {
    return (
      <section className="relative overflow-hidden pt-[104px] pb-0 sm:pt-[116px]">
        <div className="container-juice">
          <Headline className="text-[clamp(2.25rem,8.1vw,4.05rem)]" />
          <div className="mt-9 sm:mt-12">
            <div className={FRAME}>
              {reduce ? (
                <img src={heroVideoPoster} alt={HERO_ALT} className={FRAME_INNER} draggable={false} />
              ) : (
                <video
                  ref={mobileVideoRef}
                  className={FRAME_INNER}
                  poster={heroVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={HERO_VIDEO_SRC} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- interactive: pinned, scroll-scrubbed rise → full-screen spotlight ----
  return (
    <section ref={trackRef} className="relative h-[260vh]">
      {/* `position: sticky` makes its own stacking context, which would trap the
          frame below the fixed navbar (z-50). While the spotlight is enlarged we
          lift the whole sticky layer above the navbar so it covers all four edges. */}
      <div className={`sticky top-0 h-screen overflow-hidden ${expanded ? "z-[60]" : ""}`}>
        {/* Title layer — floats up and fades as the frame rises over it. */}
        <motion.div className="absolute inset-0 z-10 flex items-start" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="container-juice pt-[clamp(120px,16vh,220px)]">
            <Headline className="text-[clamp(2.7rem,8.55vw,7.65rem)]" />
          </div>
        </motion.div>

        {/* Yellow-framed video — peeks, rises to the navbar, then grows to fill every
            edge of the viewport (spotlight) where it autoplays. */}
        <motion.div
          className="absolute z-20"
          style={{
            top: frameTop,
            left: frameLeft,
            width: frameW,
            height: frameH,
            borderRadius: frameRadius,
            padding: framePad,
            backgroundColor: "#FFD950",
          }}
        >
          <motion.video
            ref={videoRef}
            className="block h-full w-full object-cover"
            style={{ borderRadius: innerRadius }}
            poster={heroVideoPoster}
            muted
            playsInline
            preload="auto"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </motion.video>

          {/* Faint "skip" — appears while the spotlight video plays. */}
          {playing && (
            <motion.button
              type="button"
              onClick={handleSkip}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-7 left-1/2 z-[61] flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-4 py-2 font-display text-[13px] font-medium text-white/85 backdrop-blur-sm transition-colors hover:bg-black/40 hover:text-white"
            >
              Skip video
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
