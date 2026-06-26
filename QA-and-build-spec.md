# Juice Landing Page — QA/QC + Build Spec

## 1. QA/QC of the current React app (localhost:5173)

**Working:**
- Renders the full design top-to-bottom.
- Fonts now load correctly: **Space Grotesk** (display) + **Rethink Sans** (body/UI). The
  earlier `font-['Family:Weight']` bug is fixed (258 references corrected).
- `react`/`react-dom` are real dependencies; build runs.

**Issues — all stem from one root cause: the export is a static pixel-trace, not an app.**
- ~68,000 lines of absolutely-positioned `<div>`s with hardcoded x/y/width/height.
- **No interactivity:** the dashboard, campaign input, template cards, Content/Creators/
  Commerce panel, agentic dial, FAQ — all static markup. Nothing clicks, expands, or moves.
- **No animations:** zero scroll, hover, or load motion.
- **Not responsive:** fixed 1440px canvas. Current `App.tsx` only *scales it down* to fit
  (text becomes tiny on phones); it does not reflow.
- **Figma-Make rendering hacks** (`leading-[0]`, `[text-box-trim]`, `text-[0px]` nodes) can
  clip or misrender text across browsers.
- **Placeholder copy** left in design (e.g. "{Big Idea Name}", "{Campaign Idea Name}").

**Conclusion:** the trace is an excellent *visual reference* but a poor *base* for
interactivity/responsiveness. The right move is a clean component rebuild using this design
as the spec — not patching the trace.

---

## 2. Target architecture (clean rebuild)
- React + Vite (keep), or Next.js if you want SSR/SEO.
- One component per section: `Nav, Hero, TrustedLogos, Campaign, Creatives, Creativity,
  Features, AgenticTeam, TwoParts, FAQ, Jam, Footer`.
- Tailwind (already set up) for responsive utilities; `framer-motion` (already a dep as
  `motion`) for animation; CSS `position: sticky` for scroll-pinning.
- Real semantic layout (flex/grid), not absolute positioning → responsive for free.

---

## 3. The 7 animations — exact behavior

| # | Section | Trigger | Behavior | Timing |
|---|---------|---------|----------|--------|
| 1 | Hero headline | on load | gradient sweep light→dark gray, left→right | ~1.2s ease-out |
| 2a | Hero dashboard | scroll into view | scales 0.85 → 1.0, origin center | scroll-linked |
| 2b | Client logos | always | infinite horizontal marquee, edge-fade mask, pause on hover | ~30s linear loop |
| 3 | Start-campaign box | — | real text input, focus ring, submit state | — |
| 4 | Creativity cards | scroll | sticky stack: Content pins, Creators scrolls over it, Commerce over Creators; ends as the collage layout | scroll-linked |
| 5 | Content/Creators/Commerce options | click | clicking an option crossfades the right-side image | ~0.35s |
| 6 | Agentic dial | scroll | outer agent ring rotates right, inner ring rotates left, center label steps Creatives→Insights→… | scroll-linked |
| 7 | FAQ | click | expand/collapse answer, one open at a time, smooth height | ~0.35s ease |

Plus baseline polish: scroll-reveal fade-ups per section, hover lifts on cards/buttons,
smooth-scroll nav, and `prefers-reduced-motion` support.

> Notes: #4 and #6 are the bespoke ones. For pixel-faithful end states, export the
> Creativity card states and the dial layers from the Figma artboard's side-exploration
> frames (they exist there as separate frames).

---

## 4. Responsive plan
- Breakpoints: desktop ≥1024px, tablet 768–1023px, mobile <768px.
- Hero: side-by-side → stacked; dashboard becomes a horizontally-scrollable card on mobile.
- Grids (creatives 3-col, features 4-col, templates 3-col) → 2-col tablet, 1-col mobile.
- Creativity stacking → plain stacked cards on mobile (no pinning).
- Dial → static/simplified on mobile.
- Fluid type via `clamp()`.

---

## 5. Assets + fonts (ready to use)
- Fonts: Rethink Sans + Space Grotesk (Google Fonts) — already imported.
- Images: originals in `src/imports/5Jun/`, and optimized WebP already hosted on your
  Webflow CDN (`cdn.prod.website-files.com/67d74ca0b43d0c87a63cb977/...`) if you prefer a CDN.

---

## 6. Build/verify environment — important
Cowork's sandbox **cannot run `npm install` / `npm run build` / a dev server** (no network
to the npm registry — confirmed). So any React rebuild done here is unverified until you run
it. A build with this much animation/responsive work needs a **live preview loop**. The
fastest path to a good result is to run this rebuild in a local environment with a dev server
(your `localhost` + a local agent such as Codex, Cursor, or Claude Code), where each
animation can be seen and tuned in real time. This spec is written so that loop is fast.
