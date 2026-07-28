/**
 * Per-route social/SEO metadata — the single source of truth.
 *
 * Consumed by two places, which is the whole point of this file living outside
 * src/: `scripts/prerender-meta.mjs` bakes these into static HTML at build time
 * (crawlers don't run JS, so the tags have to be in the file they fetch), and the
 * route components read the same values at runtime so client-side navigation
 * keeps the tab title honest. One definition, no drift.
 *
 * To cover another route: add an entry here and the build picks it up.
 */

export const SITE_ORIGIN = "https://www.juicelabs.ai";

/** Mirrors index.html. Routes without an override get these, and every route
 *  restores to these when its component unmounts. */
export const SITE_META = {
  title: "Juice AI",
  description:
    "AI powered ads engineered from the anatomy of winning ads. Create Full Funnel Campaigns, Performance Ads, Creator Collabs, Social Campaigns & more.",
  image: "/og-image.png",
  type: "website",
};

export const ROUTE_META = {
  "/pov/genz-india": {
    title: "The First Generation That Doesn't Need You — Gen Z India · Juice AI",
    description:
      "Understanding the Mind & Wallet of Gen Z India. A briefing for brand marketers, by Juice AI.",
    // Bespoke card still to come — falls back to the house image for now.
    image: "/og-image.png",
    type: "article",
  },
};

export const routeMeta = (path) => ({ ...SITE_META, ...(ROUTE_META[path] ?? {}) });
