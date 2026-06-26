# Kickoff brief — paste this into your local coding agent (Codex / Claude Code / Cursor)

You're working in the `juice-react-app` repo (Vite + React + Tailwind). It's a Figma Make
export of the Juice landing page that currently renders a **static, fixed-1440px,
absolutely-positioned pixel trace** with no interactivity, animations, or responsiveness.

**Read `QA-and-build-spec.md` first — it is the source of truth** for the QA findings, the
7 animations (with triggers/timing), the responsive plan, and the asset map.

## Goal
Rebuild the page as a **clean, semantic, responsive, animated** React app that is
*visually faithful* to the existing design (not necessarily pixel-identical), with a live
preview running the whole time (`npm run dev`).

## Rules
- Keep Vite + React + Tailwind. Use `motion` (framer-motion, already a dependency) for
  animation and CSS `position: sticky` for scroll-pinning.
- Rebuild section-by-section as components: `Nav, Hero, TrustedLogos, Campaign, Creatives,
  Creativity, Features, AgenticTeam, TwoParts, FAQ, Jam, Footer`.
- Use **real flex/grid layout, not absolute positioning** — this is what makes it responsive.
- Fonts: Rethink Sans (body/UI) + Space Grotesk (display), already imported via Google Fonts.
- Images: use `src/imports/5Jun/*` (or the hosted CDN URLs listed in the spec).
- **Verify every section in the browser before moving on.** Check desktop, tablet (~800px),
  and mobile (~390px) widths.

## Build order (verify each before the next)
1. Tokens + globals (colors, fonts, container, `prefers-reduced-motion`).
2. Nav (sticky, links, "Join the waitlist", mobile hamburger).
3. Hero: headline + gradient reveal (#1), dashboard scale-on-scroll (#2a), logo marquee (#2b).
4. Campaign: functional input (#3) + template cards.
5. Creatives row.
6. Creativity: sticky stacking cards (#4) + option→image swap (#5).
7. Features grid.
8. Agentic dial: counter-rotating rings + stepping label (#6).
9. Two-parts, FAQ accordion (#7), Jam, Footer.
10. Pass: scroll-reveal fade-ups, hover states, smooth-scroll nav, reduced-motion, a11y.

## Acceptance criteria
- Visually faithful to the design at desktop.
- Fully responsive (no horizontal scroll, readable on phones).
- All 7 animations working and smooth; `prefers-reduced-motion` respected.
- `npm run build` succeeds; deploys clean on Vercel.

For #4 and #6 pixel-faithful end states, export the Creativity card states and the dial
ring layers from the Figma artboard's side-exploration frames and drop them in `src/imports/`.
