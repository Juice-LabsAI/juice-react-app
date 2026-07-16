# Review summary — /integrated-campaigns (CREATE)

## What was built
New page at `/integrated-campaigns` (`src/app/IntegratedCampaigns.tsx`, route added in `src/main.tsx`), 12 sections under `src/app/sections/integrated-campaigns/`:

| # | Section | File | Pattern used |
|---|---|---|---|
| 1 | Hero + trust strip | Hero.tsx | quick-ads typographic hero + outline pill CTA (WaitlistPopup pattern) |
| 2 | Positioning | Positioning.tsx | Jam split statement |
| 3 | Content·Creators·Commerce manifesto | Manifesto.tsx | NEW: lavender dot-grid band, hero-scale centered type, 3 white cards, board visual, pull quote |
| 4 | What comes out | Outcomes.tsx | Features icon grid (purple badges + squiggles, lucide) |
| 5 | How it works | Steps.tsx | d2c divided step grid (4 steps) |
| 6 | How ideas spread | Spread.tsx | Stats band card + NEW four-job coloured card row |
| 7 | Sparring partner | Sparring.tsx | Jam split + purple-rule pull quote |
| 8 | Formats & channels | Formats.tsx | divided rows of lavender signal pills |
| 9 | Why teams switch | WhySwitch.tsx | AgenticTeam dot-grid display card |
| 10 | Social proof | Proof.tsx | NEW: 3 lavender testimonial cards |
| 11 | Under the hood | UnderHood.tsx | Jam split statement |
| 12 | Final CTA | CTA.tsx | d2c closing banner (cta-lemons reused) |

CTAs: "Book a demo" → WaitlistPopup (both hero + final); "See it on your brief" → https://app.juicelabs.ai; final secondary → mailto:fresh@juicelabs.ai. Nav/Footer are the shared components, untouched.

## Iterations used: 2
- iter-1: full capture; found Convert-card fill too washed (#f5f3ff on grey band)
- iter-2: fill → #ab86ff (existing TwoParts token); full re-capture, all clean

## Evidence (screenshots/iter-2/)
mobile/tablet/desktop full-page defaults; desktop CTA hover ×2 (computed-style verified: scale 1.03, bg black/5); waitlist popup open; mobile nav open; desktop Spread close-up; tablet hero viewport shot.

## Remaining known issues
1. **Manifesto board visual is a stand-in** (landing hero-dashboard.png). No campaign-board screenshot exists in the repo — supply one and I'll drop it in (`src/imports/integrated-campaigns/`).
2. Sandbox-only observations, not page defects: Google Fonts unreachable here (evidence used identical local fonts; production loads from Google as usual); supabase env warning (no .env in dev checkout); footer-can scrollWidth overflow matches published pages.

## Build
`vite build` passes with zero errors (only the repo's pre-existing chunk-size warning).
