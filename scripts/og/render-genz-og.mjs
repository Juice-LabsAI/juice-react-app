/**
 * Regenerate public/pov/genz-india-og.png — the social card for /pov/genz-india.
 *
 * The card is a 1200×630 render of the report's own hero, produced from the live
 * page rather than drawn separately, so it cannot drift from the design. It shows
 * the eyebrow chip, the headline, the Hindi line, the subhead and the briefing
 * line; the nav, logo card, stat cards, skyline and scroll cue are hidden.
 *
 * Run by hand, not part of `npm run build` — it needs a browser, and the card only
 * changes when the hero does.
 *
 *   npm run dev                          # in another terminal
 *   npx playwright install chromium      # first time only
 *   node scripts/og/render-genz-og.mjs
 *
 * Pass a different origin as argv[2] to render against a build or the live site.
 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = process.argv[2] ?? "http://localhost:5173";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "public", "pov", "genz-india-og.png");

/**
 * 92px is deliberate, not arbitrary. The headline must break as
 * "THE FIRST / GENERATION THAT / DOESN'T NEED YOU" inside the 1072px content box:
 * below ~90px "THE FIRST GENERATION" fits on one line and the break moves, stranding
 * "YOU" alone; above ~111px "DOESN'T NEED YOU" no longer fits. Check the render if
 * you change the copy — the wrap is what makes the card read at thumbnail size.
 */
const TITLE_SIZE = "92px";

const compose = (titleSize) => {
  // Freeze animations. The eyebrow chip flickers on a 6s loop, so without this
  // two runs of the script produce visibly different bytes for the same design.
  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{animation:none !important;transition:none !important;}";
  document.head.appendChild(freeze);

  for (const sel of ["nav", "#track", ".skyline", ".hero-by", ".hero-stats",
                     "#eggToast", "#train", "#papdi", ".scroll-cue"]) {
    const el = document.querySelector(sel);
    if (el) el.style.display = "none";
  }
  const header = document.querySelector("header");
  Object.assign(header.style, {
    minHeight: "0", height: "630px", padding: "0 64px",
    justifyContent: "center", overflow: "hidden",
  });
  document.querySelector(".hero-inner").style.maxWidth = "1072px";

  const title = document.querySelector("h1.glitch");
  title.style.fontSize = titleSize;
  // Scale the offset shadow with the larger type so it reads the same.
  title.style.textShadow = "4px 4px 0 var(--pink), 8px 8px 0 rgba(255,45,149,0.3)";

  document.querySelector(".hero-card-tag").style.fontSize = "13px";
  document.querySelector(".hero-dev").style.fontSize = "30px";
  const sub = document.querySelector(".hero-sub");
  sub.style.fontSize = "23px";
  sub.style.maxWidth = "none";
  document.querySelector(".hero-brief").style.fontSize = "14px";
  document.body.style.overflow = "hidden";
};

const browser = await chromium.launch();
// Render at 2× then downscale, so the neon type stays crisp at 1200×630.
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

await page.goto(`${ORIGIN}/pov/genz-india`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);
await page.evaluate(compose, TITLE_SIZE);
await page.waitForTimeout(500);

const lines = await page.evaluate(() => {
  const t = document.querySelector("h1.glitch");
  return Math.round(t.getBoundingClientRect().height / (parseFloat(getComputedStyle(t).fontSize) * 1.08));
});
if (lines !== 3) {
  await browser.close();
  throw new Error(`Headline wrapped to ${lines} lines, expected 3 — adjust TITLE_SIZE (see the note above).`);
}

mkdirSync(dirname(OUT), { recursive: true });
const buffer = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

// Playwright emits 2400×1260 at deviceScaleFactor 2; downscale to the declared
// og:image:width/height in index.html so the tags stay truthful.
const { default: sharp } = await import("sharp").catch(() => ({ default: null }));
if (sharp) {
  await sharp(buffer).resize(1200, 630, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toFile(OUT);
  console.log(`wrote ${OUT} (1200×630)`);
} else {
  const { writeFileSync } = await import("node:fs");
  writeFileSync(OUT, buffer);
  console.warn(`wrote ${OUT} at 2400×1260 — install sharp, or downscale to 1200×630 before committing,`);
  console.warn("otherwise it won't match the og:image:width/height declared in index.html.");
}
