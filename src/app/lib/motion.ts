import type { Variants } from "motion/react";

/**
 * Shared fade-up reveal used by every section's scroll-in.
 * Pair with `whileInView="show"` + `viewport={{ once: true, margin: "-80px" }}`.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Container that staggers fade-up children. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Standard viewport config for one-shot scroll reveals. */
export const revealViewport = { once: true, margin: "-80px" } as const;
