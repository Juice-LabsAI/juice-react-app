# Discrepancy Report — /creators (Phase 4 browser self-review)

Run: 2026-07-17-creator-plans · Iterations used: 3 · Evidence: `screenshots/iter-{1,2,3}/` (+ `findings.json` per iteration)

| element | property | expected | actual | source (pages/contract/direction) | status |
|---|---|---|---|---|---|
| Cascade — mobile stacked bars (Cascade.tsx) | horizontal overflow @390 | `scrollWidth <= innerWidth+1` | 401px vs 390px — bar `width` (up to 88%) + 12px gap + label min-content exceeded container | contract (§Spacing: container gutters; check 1) | FIXED (iter 2): mobile widths 45/62/88/72/54% → 40/52/72/60/46%, label gets `min-w-0`. iter-3: creators-content scrollWidth = innerWidth at all 4 widths |
| Chemistry — ContentDNA caption "watch-to-completion fingerprint" | AA contrast on lavender `#f5f3ff` | ≥ 4.5 (10px text) | `#9a9a9a` → 2.57 | contract (§Accessibility: low-contrast never sole carrier; check 5) | FIXED (iter 2): `text-[#9a9a9a]` → `text-[#666]` (≈5.3), #666 is in the contract neutrals ladder. iter-3 contrast sweep: passes |
| Chemistry — AudienceOverlap venn labels | no clipped/overlapping text | labels legible, separated | "CREATOR AUDIENCE" and "CATEGORY BUYERS" collided in the circle-overlap zone (all widths) | check 6 (visual) | FIXED (iter 3): labels wrap to two centered lines (`max-w-[64px] text-center leading-[1.3]`), clear gap verified in iter-3 screenshots |
| Cascade — stage 03 numeral "03" | decorative numeral visible on its bar | legible against `#ab86ff` | `#9a9a9a` on `#ab86ff` ≈ 1.0 contrast — invisible (desktop + mobile) | check 6 (visual); contract §imagery (decorative, aria-hidden graphic) | FIXED (iter 3): per-stage `numLight` flag; stages 03–05 use `text-white/70` (matches dark-bar treatment) |
| Page — all widths | horizontal overflow | `scrollWidth <= innerWidth+1` | +13/+25/+16/+19px at 390/768/1280/1536, caused **solely** by shared `Footer` can img (rotated, `right-[3%]`); creators content clean once can hidden; `body{overflow-x:hidden}` prevents any user-visible sideways scroll | pages (Footer.tsx — identical values measured on `/`) | PRE-EXISTING (shared component, identical on landing) — out of scope per "never touch existing sections" |
| Footer — "Join the Waitlist" button @1280/1536 | no footer collision | can image (lowCan variant) overlaps the button (button remains clickable — can is `pointer-events-none`) | pages (identical rendering on published /quick-ads, which also passes `lowCan`) | PRE-EXISTING (shared Footer + lowCan pattern as shipped) — out of scope |
| Footer — "Privacy Policy" (white/80) & copyright (white/50) on `#601db4` | AA ≥ 4.5 | 2.16 / 1.74 | pages (Footer.tsx, identical on landing) | PRE-EXISTING (shared component) — out of scope |
| Console | zero errors | only failed-resource errors from sandbox proxy blocking external hosts (fonts.googleapis.com, cdn.prod.website-files.com + youtube — landing carousel assets; localhost hero.mp4 ERR_ABORTED = normal video preload abort). Zero pageerrors, zero app errors. Warning listed: `[supabase] Missing VITE_SUPABASE_URL/ANON_KEY` (expected without local .env) | environment | ENVIRONMENT (not a page defect); brand fonts verified loaded via `document.fonts.check` |
| h1 / h2 | font-family | Rethink Sans | "Rethink Sans", sans-serif | contract §Typography | PASS |
| body paragraph (`p.font-display`) | font-family | Space Grotesk | "Space Grotesk", sans-serif | contract §Typography | PASS |
| Hero primary CTA | radius / bg / label font | pill / rgb(51,51,51) / Space Grotesk bold | 3.4e7px (pill) / rgb(51,51,51) / Space Grotesk 700 | contract §Component inventory | PASS |
| Hero primary CTA | hover transform | scale ≈1.03, 200ms | computed `scale: 1.03` on hover (Tailwind v4 `scale` property) | contract §Motion | PASS |
| Hero secondary CTA | hover | pill+arrow pattern, `hover:bg-black/5` wash | bg → oklab(0 0 0 / 0.05) on hover | contract (Pill+arrow button, WaitlistPopup.tsx:182 pattern) | PASS |
| `.container-juice` | max-width | 1440px | 1440px | contract §Spacing & layout | PASS |
| "Book a demo" → waitlist popup | opens `role="dialog"`, closes on Escape | opened + closed correctly (1280-waitlist-open.png) | direction (same mechanism as footer Get a Demo) | PASS |
| "See it on your brief" → `#how-it-works` | anchors with nav clearance | scrolled to y=7506, target top = 99.6px (scroll-padding-top 100px) | direction | PASS |
| S4 PlanBoard | board scrolls in own container | `overflow-x-auto` container: scrollW 860 vs clientW 302/633 @390/768 (internal scroll), no page bleed | direction / check 1 | PASS |
| Keyboard focus on CTA | visible focus | default outline `oklab(0.708 0 0/0.5) auto 1px` after Tab (contract: CTAs rely on default outline); 1280-focus-cta.png | contract §Interaction (focus) | PASS |
| A11y structure | one h1; landmarks; img alts | 1 h1; header/main/footer + 14 sections; 1 img (footer can, has alt); decorative SVGs/graphics aria-hidden; 0 unlabeled | contract §Accessibility baseline | PASS |
| Contrast — dark band `#601db4` (UnderTheHood) | ≥4.5 (≥3 large) | white on #601db4 = 9.0 for all text | contract | PASS |
| Contrast — lavender panels/chips | ≥4.5 | #444 on #f5f3ff = 8.88; #535353 = 7.01; all sampled pairs pass (35 pairs swept) | contract | PASS |
| Nav + Footer parity vs `/` | identical render | bounding boxes, bg, fonts, radii byte-identical (JSON-equal) at 1280; visual match confirmed vs 1280-landing-reference.png | check 4 | PASS |
| UnderTheHood + FinalCTA @1536 fullPage capture | sections visible | appeared blank in iter-1/2 captures — capture-harness scroll timing (reveals verified `opacity:1` on live page) | test harness (not page code) | RESOLVED (iter 3): harness dwells per-section bottom-to-top + verifies no motion element left hidden |

Unresolved rows affecting /creators-owned code: **none**. Remaining rows are shared-component behaviors identical to published pages (footer can overflow/collision, footer legal-link contrast) and sandbox-environment network blocks.
