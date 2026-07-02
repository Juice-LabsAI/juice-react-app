import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import heroVideoPoster from "../../imports/hero-video-poster.png";

// The hero video lives at public/hero.mp4 (served at /hero.mp4). It's a raw
// motion graphic with no border, so the yellow frame is recreated in CSS below.
// Until the file exists the poster shows and the sticky-video behaviour stays off.
const HERO_VIDEO_SRC = "/hero.mp4";

// Tunable scroll-reveal positions (viewport-relative translateY). The framed
// video is taller than the old image, so it roughly fills the viewport when centred.
const IMG_PEEK = "80vh"; // frame barely peeking (~20%) at the bottom on load
const IMG_CENTER = "8vh"; // frame risen to fill/centre — where the video plays
const TITLE_RISE = "-24vh"; // how far the title floats up as it's covered
const REVEAL_END = 0.85; // scroll progress at which the frame is centered
const REARM_BELOW = 0.55; // once you scroll this far clear of the video, the stickiness re-arms
const SKIP_SCROLL = 2200; // px of extra scrolling needed to break out while the video plays
const SETTLE_MS = 750; // ignore the entering scroll's momentum this long before counting an escape
const HOLD_TIMEOUT = 25000; // ms — fallback release if the video's duration is unknown
const HERO_ALT = "Juice — AI that builds ads engineered to outperform";

// Yellow frame (matches the original image: #FFD950, ~3.8% border of the width).
const FRAME = "overflow-hidden rounded-[clamp(18px,2vw,34px)] bg-[#FFD950] p-[3.8%]";
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

  // Scroll-scrubbed reveal: the section pins (sticky) while you scroll through a
  // tall track. Progress 0 → 1 drives the animation, so it's fully reversible.
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 26, restDelta: 0.0004 });

  const imageY = useTransform(p, [0, REVEAL_END], [IMG_PEEK, IMG_CENTER]);
  const titleY = useTransform(p, [0, REVEAL_END], ["0vh", TITLE_RISE]);
  const titleOpacity = useTransform(p, [0, REVEAL_END * 0.85], [1, 0]);

  // ---- sticky-video hold ----------------------------------------------------
  // When the frame reaches centre the video autoplays and the page becomes
  // "sticky": downward scroll is held until the video ends (you can still break
  // out by scrolling a lot, or by scrolling back up). Once it has played through,
  // the stickiness is gone for good.
  const lockedRef = useRef(false);
  const playedRef = useRef(false);
  const accumRef = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishHoldRef = useRef<() => void>(() => {});
  const [playing, setPlaying] = useState(false); // true while the held video is playing (shows the skip)

  useEffect(() => {
    if (!interactive) return;
    const v = videoRef.current;
    if (!v) return;

    let settleUntil = 0; // absorb the scroll momentum that carried us to centre
    let playStarted = false;

    const releaseHold = () => {
      lockedRef.current = false;
      accumRef.current = 0;
      playStarted = false;
      setPlaying(false);
      if (holdTimer.current) clearTimeout(holdTimer.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("keydown", onKey, true);
    };
    const finishHold = () => {
      playedRef.current = true; // stickiness gone for good
      releaseHold();
    };
    finishHoldRef.current = finishHold; // let the skip button release the hold

    // Count an escape only after the entering scroll's momentum has settled.
    const bump = (amount: number) => {
      if (Date.now() < settleUntil) return;
      accumRef.current += amount;
      if (accumRef.current > SKIP_SCROLL) finishHold();
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return; // let upward scroll reverse out of the video
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
    // Play only once the frame has fully settled into focus (centred).
    const startPlayback = () => {
      if (playStarted || !lockedRef.current) return;
      playStarted = true;
      setPlaying(true);
      try { v.currentTime = 0; } catch { /* not seekable yet */ } // always replay from the start
      // Safety release scaled to the actual video length (falls back if unknown).
      const ms = isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 + 4000 : HOLD_TIMEOUT;
      holdTimer.current = setTimeout(finishHold, ms);
      v.play().catch(() => finishHold()); // if the video can't play, don't trap the user
    };
    const engageHold = () => {
      lockedRef.current = true;
      accumRef.current = 0;
      settleUntil = Date.now() + SETTLE_MS;
      // Snap the frame to exactly centered (handles fast/fling scrolls landing past it).
      const track = trackRef.current;
      if (track) window.scrollTo(0, track.offsetTop + REVEAL_END * (track.offsetHeight - window.innerHeight));
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
      window.addEventListener("keydown", onKey, true);
      if (p.get() >= REVEAL_END - 0.01) startPlayback(); // already fully centred
    };
    const onEnded = () => finishHold();
    const onError = () => finishHold(); // broken/missing video → treat as done, never trap
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onError);

    const stop = scrollYProgress.on("change", (val) => {
      if (lockedRef.current) {
        // scrolled back up out of the video before it finished → release & reset
        if (val < REVEAL_END - 0.1) {
          releaseHold();
          v.pause();
          v.currentTime = 0;
        }
        return;
      }
      if (!playedRef.current && val >= REVEAL_END) {
        engageHold();
      } else if (playedRef.current && val < REARM_BELOW) {
        // scrolled well clear of the video → re-arm so it sticks again on the next visit
        playedRef.current = false;
      }
    });
    // The spring lags the raw scroll — start the video the moment it's fully centred.
    const stopP = p.on("change", (val) => {
      if (lockedRef.current && !playStarted && val >= REVEAL_END - 0.01) startPlayback();
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
    finishHoldRef.current(); // release the sticky hold
    const track = trackRef.current;
    if (track) window.scrollTo({ top: track.offsetTop + track.offsetHeight, behavior: "smooth" });
  };

  // ---- non-interactive (mobile / reduced motion): static, normally-scrolling hero ----
  if (!interactive) {
    return (
      <section className="relative overflow-hidden pt-[104px] pb-0 sm:pt-[116px]">
        <div className="container-juice">
          <Headline className="text-[clamp(2.5rem,9vw,4.5rem)]" />
          <div className="mt-9 sm:mt-12">
            {/* Framed poster on mobile / reduced-motion (no scroll-sticky video). */}
            <div className={FRAME}>
              <img src={heroVideoPoster} alt={HERO_ALT} className={FRAME_INNER} draggable={false} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- interactive: pinned, scroll-scrubbed reveal + sticky video ----
  return (
    <section ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title layer — floats up and fades as the frame rises over it. */}
        <motion.div className="absolute inset-0 z-10 flex items-start" style={{ y: titleY, opacity: titleOpacity }}>
          <div className="container-juice pt-[clamp(120px,16vh,220px)]">
            <Headline className="text-[clamp(3rem,9.5vw,8.5rem)]" />
          </div>
        </motion.div>

        {/* Yellow-framed video — barely peeks on load, floats up to centre, autoplays there. */}
        <motion.div className="absolute inset-x-0 top-0 z-20" style={{ y: imageY }}>
          <div className="container-juice">
            <div className={FRAME}>
              <video
                ref={videoRef}
                className={FRAME_INNER}
                poster={heroVideoPoster}
                muted
                playsInline
                preload="auto"
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>

        {/* Faint "skip" — appears at the bottom of the viewport while the held video plays. */}
        {playing && (
          <motion.button
            type="button"
            onClick={handleSkip}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-2 font-display text-[13px] font-medium text-[#444]/45 transition-colors hover:text-[#444]/85"
          >
            Skip video
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </div>
    </section>
  );
}
