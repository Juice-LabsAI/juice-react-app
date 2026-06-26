import { motion, useReducedMotion } from "motion/react";
import heroDashboard from "../../imports/5Jun/hero-dashboard.png";

/* ---- Animation #1: headline gradient sweep (light band passes L→R) ------ */
function Headline() {
  const reduce = useReducedMotion();
  return (
    // Exact Figma spec: Rethink Sans ExtraBold, 120px, line-height 0.9, #444
    <h1 className="font-body text-[clamp(2.5rem,8.33vw,7.5rem)] font-extrabold leading-[0.9] text-[#444444] [word-break:break-word]">
      <motion.span
        style={
          reduce
            ? { color: "#444444" }
            : {
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                // dark at both ends, light band in the middle — sweeping it fully
                // across leaves the text uniformly dark once it settles.
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

  return (
    <section className="relative overflow-hidden pt-[104px] pb-0 sm:pt-[116px]">
      <div className="container-juice">
        <Headline />

        {/* #2a dashboard grows on load (0.86 → 1.0), origin center-top */}
        <motion.div
          initial={reduce ? false : { scale: 0.86, opacity: 0 }}
          animate={reduce ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ transformOrigin: "center top" }}
          className="mt-9 sm:mt-[52px]"
        >
          <img
            src={heroDashboard}
            alt="The Juice product dashboard: jam with a team of creative agents"
            className="w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
