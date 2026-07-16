# Discrepancy report — /integrated-campaigns (final: iter-2)

| element | property | expected | actual | expectation source | status |
|---|---|---|---|---|---|
| Spread "Convert" card | background | saturated sibling fill (cards trio uses #c8b0ff/#ffb189/#ffe689) | iter-1 used #f5f3ff (washed out on #f6f6f6 band) | pages (Stats card pattern) | RESOLVED iter-2 → #ab86ff (TwoParts engagement-card fill) |
| Manifesto board visual | imagery | campaign-board product screenshot | landing hero-dashboard.png used as stand-in (no board asset exists in repo) | direction (user design note) | OPEN — needs user-supplied asset; surfaced at Phase 5 gate |
| All sections | fonts in evidence shots | Rethink Sans / Space Grotesk | Google Fonts unreachable from this sandbox (ERR_TUNNEL_CONNECTION_FAILED); identical families injected locally (@fontsource) for capture only — production code untouched | contract | RESOLVED (capture-only workaround) |
| CTA hover states | hover:scale-[1.03] / hover:bg-black/5 | apply on hover | headless Chromium reports no hover-capable pointer, so Tailwind's `@media (hover: hover)` gate suppressed them; verified working under headful Xvfb (scale=1.03, bg oklab 0 0 0/0.05) — same gating as published pages | pages + contract | RESOLVED (verified; capture env issue) |
| Footer can image | horizontal overflow | none | scrollWidth 388 vs 375 — identical on published /d2c (388/375); clipped by body `overflow-x: hidden` | pages | NOT A DEFECT (pre-existing site-wide, matches pages) |
| Tablet full-page capture | hero H1 visibility | visible | fixed nav + backdrop-blur painted over H1 in Chromium fullPage stitch; viewport shot (tablet-hero-viewport.png) proves correct render (h1 top=180 vs nav bottom=86) | capture artifact | NOT A DEFECT |
| Console | errors | zero | 2 pre-existing environment messages: Google Fonts tunnel failure (sandbox-only), supabase env-var warning (no .env in dev checkout) — both occur on published pages' routes in this sandbox too | pages baseline | NOT A DEFECT (listed per protocol) |

## Checks passed (iter-2)
- Zero elements stuck at opacity < 0.9 after reveal pass, all 3 breakpoints
- No horizontal overflow originating from the new page's own sections (scoped `main *` scan, all breakpoints)
- Interaction parity: Book a demo → WaitlistPopup opens (screenshot); secondary CTA → https://app.juicelabs.ai; mailto CTA present; hover states verified with computed-style probes
- Tokens: headings font-body/Rethink, copy font-display/Grotesk, #444 text, pill CTAs, 12px card radii, contract colors only (#f5f3ff, #f6f6f6, #c8b0ff, #ffb189, #ffe689, #ab86ff, #9165f5, #8656F4, #333, #111112, #e6e6e6)
- a11y: header>main>footer landmarks, aria-label on icon buttons, decorative images alt=""+aria-hidden, meaningful alt on board visual, dark-on-light AA contrast on all text (#444 on white/#f6f6f6/card fills), reduced-motion inherited from global kill-switch + fadeUp pattern
