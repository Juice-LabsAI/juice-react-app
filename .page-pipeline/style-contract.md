# Juice Website — Style Contract

## Provenance
- generatedAt: 2026-07-16T00:00:00+05:30
- sourceCommit: 6dbafa6f6e0fde76ad2aa68c30634ca58536101b
- primarySources: https://www.juicelabs.ai/ (src/app/App.tsx), /d2c (src/app/D2C.tsx), /quick-ads (src/app/QuickAds.tsx), shared sections src/app/sections/**, styles src/styles/*.css
- secondarySources: website DS bundle /root/.claude/skills/juice-page-pipeline/assets/juice-ai-design (tokens/colors.css, typography.css, radii.css, fonts.css)
- extractedBy: b2b-saas-design-system skill, extraction/audit modes (Phases 1–3 discipline)

## Conflicts (pages won — Hard Rule 1)
| property | pages value | design-system value | where used |
|---|---|---|---|
| brand yellow | `#FFD950` (`--color-juice`) | `rgb(255,227,15)` #FFE30F | hero video frame, FAQ band, active carousel dot |
| brand orange | `#FE5C2B` (`--color-orange`); logo `#F78146` | `rgb(253,103,61)` #FD673D | accents, nav wordmark |
| brand purple (token) | `#8656F4` (`--color-purple`; Features badges) | `rgb(145,101,245)` #9165F5 | Features badges; note pages ALSO use #9165F5 for d2c accents/focus ring — both kept, per-usage |
| default text color | `#444444` (headings + body, ~79 uses) | `--text-default` #202224 | all marketing sections |
| primary button | pill `rounded-full bg-[#333] text-white` | `--radius-md` 8px + `--action-primary-bg` grey-900 #202224 | Nav CTA, d2c CTA |
| font token naming | `--font-display`=Space Grotesk, `--font-body`=Rethink Sans (theme.css) — INVERTED usage: headings use `font-body` (Rethink), copy uses `font-display` (Grotesk) | DS names them the intuitive way around (display=Rethink, body=Grotesk) | every section. Visual result identical; USE THE PAGES' CLASS CONVENTION (`font-body` for headings, `font-display` for copy) |
| card radius | 12px family (`rounded-xl`/`rounded-[12px]`) for standard cards | `--radius-md` 8px "buttons, inputs, cards" | TwoParts, Stats, Compare, signal pills |

Agreements worth noting: deep purple footer `#601db4` = DS `--juice-purple-deep` rgb(96,29,180); DS grey-200 #E8E8E8 = pages' chip borders; DS caption 13px, body-lg 20px, display leading 0.9, `--leading-body` 1.41 all match page usage.

## Color tokens
| token | value | usage | source |
|---|---|---|---|
| ink / primary-button fill | `#333333` (`--color-ink`, `bg-ink`) | dark pill CTAs, FAQ text/icons, send button | pages |
| text-default | `#444444` (also `--color-ink-soft` #444) | headings AND body — the dominant text color | pages |
| text-step/body-muted | `#535353` | list/step body text | pages |
| text-muted | `#666` | descriptors | pages |
| text-near-black | `#111112` | popup buttons/borders, Jam text | pages |
| input-text | `#212121` (borders at /10, /35 focus) | waitlist inputs | pages |
| inactive grey | `#b0b0b0` (desktop) / `#888` (mobile) | inactive insights — known drift, follow context | pages |
| brand yellow | `#FFD950` | frames, FAQ band, active dots | pages |
| yellow (success bg variant) | `#FFE94D` | waitlist success state only | pages |
| brand orange | `#FE5C2B` | accent (mostly latent) | pages |
| logo orange | `#F78146` | nav wordmark, Moxie pill | pages |
| footer logo pink | `#F296AF` | footer wordmark | pages |
| brand purple (badge) | `#8656F4` + squiggle `#9165F5` | Features badges | pages |
| purple accent | `#9165f5` | d2c highlights, CampaignInput focus ring | pages |
| purple section bg | `#8b5cf6` | quick-ads Formats band | pages |
| purple fills (dark) | `#7c54d6`, `#5d37b3`, `#5e25cf`, `#601db4` (footer), `#8948de` (watermark) | card fills, footer | pages |
| purple fills (light) | `#ab86ff`, `#bba0ff` (footer buttons), `#c8b0ff` (stat card), `#b389e9` (nav eyebrow) | light fills | pages |
| lavender tint bg | `#f5f3ff` | section/card bg (BriefCarousel, quick-ads Carousel, pills, Compare) | pages |
| light grey card bg | `#f6f6f6` | AgenticTeam, d2c CTA, Stats, Adapt cards | pages |
| stat oranges/yellows | `#ffb189`, `#ffe689` | quick-ads stat cards | pages |
| error | border `#f46c6c`, focus `#e0483f`, text `#c0392b`, banner bg `#fff0f0` | waitlist validation | pages |
| dividers | `#e6e6e6` (steps), `#e8e8e8` (chips), `black/5–15` (nav, FAQ) | rules/borders | pages |
| dark nav panel | `#202224` (panel), `#333537` (card), `#4e4f50` (divider) | nav dropdown | pages |
| page bg | `#ffffff`; body text fallback `#1a1a1a` (globals.css) | base | pages |
| dot-grid dot | `#d9d4ec` @16px pitch | textured sections | pages |
| grey ramp (gap-filler) | grey-50 #FCFCFC …grey-900 #202224 (DS colors.css) | ONLY for values pages never define | DS |

shadcn oklch semantic set exists in theme.css (incl. dark mode) but marketing pages do not use it — do NOT build new marketing sections on it.

## Typography
| role | family | size | weight | line-height | tracking | source |
|---|---|---|---|---|---|---|
| hero H1 | Rethink Sans (`font-body`) | `clamp(2.7rem,8.55vw,7.65rem)` (landing) / up to 134px (quick-ads) | 800 | 0.9–0.92 | -0.01em | pages |
| giant display H2 | Rethink Sans | `clamp(2.5rem,~6–8.3vw,80–120px)` | 800 | 0.9 | -0.02em | pages |
| standard section H2 | Rethink Sans | `clamp(1.875rem,4vw,3rem)` | 500 | 1.2 | — | pages |
| alt section H2 | Rethink Sans | `clamp(2.25rem,4.4vw,64px)` | 700 | 1.05–1.2 | -0.02em (some) | pages |
| card H3 | Rethink Sans | text-2xl → 28–32px | 500–700 | 0.9–1.2 | — | pages |
| subheading/lede | Space Grotesk (`font-display`) | 20px | 500 | 1.37–1.41 | — | pages |
| body | Space Grotesk | 15–16px | 400 | 1.41–1.5 | — | pages |
| button label | Space Grotesk | 15–20px (16px nav) | 700 | 1 (leading-none) | — | pages |
| eyebrow/label | Rethink Sans | 13px | 800 | — | 0.12em, uppercase | pages |
| small/legal | Space Grotesk | 13px | 400 | — | — | pages |
| specialty | Anton (footer watermark), Archivo Black (waitlist headings), Archivo (Webflow carousel) | — | — | — | — | pages |

Loaded via src/styles/fonts.css (Google Fonts). Weights in use: 400/500/600/700/800.

## Spacing & layout
- grid/base unit: 4px (Tailwind); no strict 8px grid — arbitrary values common
- container: `.container-juice` = max-w 1440px, `padding-inline: clamp(1.25rem,3.6vw,3.25rem)` — USE THIS for every section
- section vertical rhythm: `py-16 lg:py-[100px]` (quick-ads style) or `py-20 sm:py-24 (lg:py-28)` (landing style); heroes clear the fixed 86px nav with `pt-[120px] sm:pt-[140px]`
- heading→content gap: `mt-12` (+ lg:mt-14/16 variants)
- common gaps: gap-3 (card grids), gap-2/4/5/6/8/12; features `gap-x-8 gap-y-12`
- card inner padding: `p-6 sm:p-8` (small), `px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]` (band cards)
- `html { scroll-padding-top: 100px }`; nav height 86px, fixed, z-50

## Radii, borders, shadows
| token | value | usage | source |
|---|---|---|---|
| pill | `rounded-full` | ALL buttons, inputs (waitlist), chips | pages |
| band card | 28–32px (`rounded-[28px]`, `rounded-[32px]`, footer `rounded-t-[32px]`) | large section cards, modal, footer | pages |
| panel | `rounded-2xl` 16px | nav dropdown, Creativity card, CampaignInput | pages |
| card | 12px (`rounded-xl`/`rounded-[12px]`; images 11–14px) | standard cards, pills(bg), image tiles | pages |
| small chip | 8–10px | ad-card frames, mini chips | pages |
| borders | `black/5–15` hairlines; `#e6e6e6`/`#e8e8e8` greys; `border-2 border-white` framed images | — | pages |
| shadow-pop | `0_30px_80–90px_-20px rgba(0,0,0,0.5)` | dropdown, modal | pages |
| shadow-card-hover | `0_20px_50px_-24px rgba(0,0,0,0.25)` | expanded feature card | pages |
| shadow-subtle | `0_4px_8px rgba(0,0,0,0.04)` / `0_2.5px_5px rgba(0,0,0,0.06)` | inputs, mini cards | pages |

## Motion
| token | duration/easing | usage | source |
|---|---|---|---|
| fadeUp reveal | opacity 0→1, y 28→0; 0.6s `[0.22,1,0.36,1]`; stagger 0.08, viewport `once, -80px` | src/app/lib/motion.ts — use for all new section reveals | pages |
| expand/collapse | 0.35–0.45s `[0.4,0,0.2,1]` | accordions, card expansion | pages |
| menu/dropdown | 0.2s easeOut, opacity + y±8 | nav | pages |
| hover scale | `hover:scale-[1.03]` (CTAs, 1.04 footer, 1.05 send) `transition-transform duration-200` | buttons | pages |
| hover lift | `hover:-translate-y-1 duration-300` | image cards | pages |
| marquee/dials | linear infinite (64s marquee, 60–75s dials) | decorative | pages |
| reduced motion | globals.css kill-switch + `useReducedMotion` per component — REQUIRED in new scroll/motion work | a11y | pages |

Library: `motion/react`. Scroll-driven sections use `useScroll`+`useSpring(stiffness 60, damping 26)`+`useTransform`, desktop-gated by `(min-width:1024px)`.

## Breakpoints (from config)
| name | width |
|---|---|
| mobile | 375 |
| tablet | 768 |
| desktop | 1440 |

Code convention: ONLY `sm:` (640) and `lg:` (1024) prefixes are used. `lg` is the desktop switch (nav links, multi-col grids, pinned scroll). Do not introduce `md:`/`xl:` — follow the pages.

## Component inventory (as used on published pages)
| component | variants seen | states seen | source file(s) |
|---|---|---|---|
| Nav bar | transparent-top / scrolled (`bg-white/85 backdrop-blur-md border-b border-black/5`); mobile hamburger→X | scroll >8px, open/closed | sections/Nav.tsx |
| Primary CTA | dark pill `bg-[#333] text-white font-display font-bold`; px-6 py-[15px] (nav) / px-7 py-5 (large) | hover:scale-[1.03] | Nav.tsx, d2c/CTA.tsx |
| Footer CTA | lavender pill `bg-[#bba0ff] text-[#444] text-sm font-bold` | hover:scale-[1.04] | Footer.tsx |
| Outline pill button | `border border-[#111112]` + trailing icon circle | hover:bg-black/5, disabled:opacity-60 | WaitlistPopup.tsx |
| Image card | `rounded-[14px]` + caption | hover lift | Creatives.tsx |
| Band card | grey/lavender/yellow `rounded-[12–28px]` w/ watermark digits | — | TwoParts, Stats, AgenticTeam, FAQ |
| Framed ad card | white border p-[3–4px] on purple | — | Formats, Adapt |
| FAQ accordion | one-open-at-a-time, plus→minus | aria-expanded, 0.35s height | FAQ.tsx |
| Form input | `h-12 rounded-full border-2 bg-white px-5` | focus, error, disabled | WaitlistPopup.tsx |
| Prompt box | `rounded-2xl ring-1 ring-black/5` | focus-within:ring-2 ring-[#9165f5], sent | components/CampaignInput.tsx |
| Logo marquee | 64s loop, edge-fade mask, hover-pause | — | TrustedLogos.tsx |
| Wordmark | recolorable SVG (`#F78146` nav / `#F296AF` footer) | — | sections/Logo.tsx |
| Footer | purple `#601db4` rounded-top, Anton watermark, can image | lowCan prop | Footer.tsx |
| Waitlist modal | portal z-[80], scroll-lock, Escape/click-outside | error/success | WaitlistPopup.tsx |

## Section patterns (page-level building blocks)
| pattern | appears on | structure summary |
|---|---|---|
| scroll-spotlight video hero | landing | pinned 260vh, yellow-framed video morph |
| typographic hero | quick-ads | giant H1 left + Grotesk lede right, bottom-aligned |
| collage hero | d2c | H1 over overlapping image cards + pills |
| logo marquee strip | landing | max-w-1040 infinite marquee |
| lavender prompt band | landing, quick-ads | `#f5f3ff` section w/ CampaignInput / typed-brief carousel |
| H2 + 3-card image grid | landing | staggered fadeUp cards w/ captions |
| scroll-pinned stacked cards | landing | 280vh, expanding cards |
| icon feature grid | landing | 2/3-col, purple circle badges (lucide) |
| watermark display card | landing (AgenticTeam), quick-ads (Stats, Adapt) | grey card, giant display H2, decorative element |
| two-column offer split | landing | 2 lavender cards w/ watermark digits |
| FAQ band | landing | yellow rounded-top card, heading left / accordion right |
| split brand statement | landing (Jam) | heading+lede left, artwork right |
| divided step grid | d2c | 3×2 full-bleed rules + gutter dividers |
| pinned step-scroller | d2c | image panel + scrolling step column |
| closing CTA banner | d2c | grey card: image left, copy + dark pill right |
| animated flow diagram | quick-ads | pills → diamonds → insights w/ SVG wires |
| purple showcase band | quick-ads | full-bleed `#8b5cf6`, dot texture, framed ads |
| comparison columns | quick-ads | 2 cards (grey vs lavender), icon-chip rows |
| footer | all | purple rounded-top w/ watermark + can |

## Interaction patterns
- hover: CTAs scale 1.03–1.05 (200ms); cards lift -4px (300ms); links opacity-70 / color shift; ghost buttons `hover:bg-black/5`
- active/pressed: none defined on pages (do not invent)
- focus: no `focus-visible` utilities on pages; inputs use `focus:border-…`; prompt box `focus-within:ring-2 ring-[#9165f5]`; global `outline-ring/50`. For NEW interactive elements, match this minimal approach (browser default + these patterns)
- disabled: `disabled:opacity-60` (only pattern found)
- error: `#f46c6c` border / `#e0483f` text / `#fff0f0` banner
- transitions default: 200ms buttons, 300ms chrome/cards, 350–450ms expand, reveals 0.6s `[0.22,1,0.36,1]`

## Iconography & imagery
- lucide-react only in Features.tsx (strokeWidth 1.75, white, in purple badges); everything else hand-inlined SVG, 16–24 viewBox, stroke 1.4–2, round caps, `aria-hidden`
- brand imagery: ES-module imports from src/imports/<batch>/ (PNG/WEBP); video public/hero.mp4; decorative images get `alt="" aria-hidden draggable={false} select-none pointer-events-none`
- new-page assets should follow the src/imports/<slug>/ convention

## Fonts & licenses (from config)
| family | source | license |
|---|---|---|
| Rethink Sans (headings, via `font-body`) | Google Fonts | OFL |
| Space Grotesk (copy/buttons, via `font-display`) | Google Fonts | OFL |
| Anton, Archivo, Archivo Black (specialty) | Google Fonts | OFL |
| Manrope, Inter, Plus Jakarta Sans, PT Serif, Bowlby One | loaded but unused on pages | OFL |

## Accessibility baseline observed
- landmarks: `header > main > footer` on every page; `<nav>` in header; section anchor ids
- meaningful alts on content images; `alt=""`+`aria-hidden` decorative; `aria-expanded` on accordions/menus; dialogs `role="dialog" aria-modal`
- reduced-motion honored globally (globals.css kill-switch) and per component (`useReducedMotion`)
- known gaps (do not replicate in new work if avoidable, but do not "fix" existing pages): no focus-visible on pill CTAs; some low-contrast decorative text (white/50 on purple)

## Known page oddities (context for builders — pages still win)
- Two parallel color systems: shadcn oklch tokens unused by marketing sections; brand tokens exist but sections hardcode hex (`bg-[#333]` not `bg-ink` mostly). For NEW pages: match the pages' visual values; prefer the brand tokens (`bg-ink`, `text-ink`) where they exist (#333/#444 family), hardcode the rest exactly as the pages do.
- Grey text drift (#444 vs #333 vs #535353…) and ~12 purples — pick the value used by the section pattern you are recomposing.
- Primary CTA padding varies by context (nav 16px / large 20px) — copy the closest existing instance.
