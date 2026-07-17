# Juice Website — Style Contract

## Provenance
- generatedAt: 2026-07-17T00:00:00Z
- sourceCommit: 6dbafa6f6e0fde76ad2aa68c30634ca58536101b
- primarySources: https://www.juicelabs.ai/ (src/app/App.tsx + src/app/sections/*.tsx), https://www.juicelabs.ai/d2c (src/app/D2C.tsx + src/app/sections/d2c/*.tsx), https://www.juicelabs.ai/quick-ads (src/app/QuickAds.tsx + src/app/sections/quick-ads/*.tsx), src/styles/{theme,globals,fonts,index,tailwind}.css, src/app/lib/motion.ts, src/app/components/CampaignInput.tsx
- secondarySources: /root/.claude/skills/juice-page-pipeline/assets/juice-ai-design (WEBSITE design-system bundle: readme.md, tokens/, ui_kits/website/). Platform/app design system NOT used.
- extractedBy: b2b-saas-design-system skill, INIT Phases 1–3 (extraction-only discipline) + Mode 3 audit reconciliation

Stack note: Tailwind v4 CSS-first (`@import 'tailwindcss'` in src/styles/tailwind.css; tokens in `@theme inline` in src/styles/theme.css). There is **no tailwind.config**. Custom utilities from theme.css tokens: `font-display`, `font-body`, `bg-ink`, `text-ink`, etc.

## Conflicts (pages won — Hard Rule 1)
Same 14 entries appended to `.page-pipeline/decisions.log`.

| property | pages value | design-system value | where used |
|---|---|---|---|
| brand yellow | `#FFD950` (theme.css:85) | `#FFE30F` | hero frame (Hero.tsx:34), FAQ bg (FAQ.tsx:88), dial, carousel active dot |
| brand orange | `#FE5C2B` (theme.css:87), `#F78146` logo/pill | `#FD673D` | accents, nav logo, Moxie pill |
| brand purple | `#8656F4` (theme.css:89) + `#9165F5` accents + `#8B5CF6` section | `#9165F5` only | Features badges, focus ring, Formats bg |
| font role token names | `--font-display`="Space Grotesk" (BODY role), `--font-body`="Rethink Sans" (HEADING role) — inverted naming | display=Rethink Sans, body=Space Grotesk | theme.css:91–92; every class recipe below |
| heading ink | `#444444` / `#333333` | `rgb(32,34,36)` / `#111112` | all section headings |
| body text color | `#1a1a1a` base; `#444`/`#535353`/`#666` in sections | `rgb(32,34,36)` | globals.css:24 |
| primary button | `rounded-full` pill, `bg-[#333]` | 8px radius, grey-900 bg | Nav.tsx:133, d2c/CTA.tsx:43 |
| button hover | `hover:scale-[1.03]`–`[1.05]`, 200ms transform | darken one step, 120–150ms | all CTAs |
| container | max-w 1440px, `clamp(1.25rem,3.6vw,3.25rem)` gutters | ~1280px, 48px gutters | .container-juice, globals.css:38–43 |
| section rhythm | 64–112px (`py-16`…`py-28`, `lg:py-[100px]`) | 52–80px | every section |
| lavender panel bg | `#F5F3FF` | `#EEEDFB` / `#C6BDDB` | BriefCarousel, TwoParts, quick-ads Carousel/Signals/Compare |
| footer wordmark color | `#F296AF` pink | yellow on dark | Footer.tsx:37 |
| UI/button font | Space Grotesk (`font-display`) / Rethink Sans (`font-body`) | Manrope / Inter | buttons, chips, labels |
| motion durations | 200–300ms UI; 0.6s reveals `[0.22,1,0.36,1]` | 0.12–0.15s fades | lib/motion.ts, hover recipes |

Token-gap rule: no token used by the pages was unresolvable in the repo — the design system supplied no values. Pages-only values missing from the DS are flagged in decisions.log (NOTE line) as future DS-update candidates.

## Color tokens
| token | value | usage | source (pages/DS) |
|---|---|---|---|
| `--color-juice` (`bg-juice`) | `#FFD950` | hero video frame (Hero.tsx:34,364), FAQ panel bg (FAQ.tsx:88), AgenticTeam dial fill (AgenticTeam.tsx:19), waitlist ribbons (WaitlistPopup.tsx:27), carousel active dot | pages (theme.css:85) |
| `--color-juice-deep` | `#E4B714` | defined; not used by current sections | pages (theme.css:86) |
| `--color-ink` (`bg-ink`,`text-ink`) | `#333333` | primary CTA bg (`bg-[#333]` literal, `bg-ink` in Nav.tsx:144,202), dark headings | pages (theme.css:83) |
| `--color-ink-soft` | `#444444` | dominant heading/body ink (`text-[#444]` everywhere) | pages (theme.css:84) |
| `--color-orange` | `#FE5C2B` | active/selected accent (Creativity.tsx:41 arrow, interactive list active) | pages (theme.css:87) |
| logo orange | `#F78146` | nav wordmark fill (Logo.tsx:8), D2C Moxie pill bg (d2c/Hero.tsx:56) | pages |
| footer logo pink | `#F296AF` | footer wordmark (Footer.tsx:37) | pages |
| `--color-purple` | `#8656F4` | Features icon badge circle (Features.tsx:75) | pages (theme.css:89) |
| purple accent | `#9165F5` | badge squiggle (Features.tsx:76), "JUST" span (d2c/CTA.tsx:25), step rail (InAction.tsx:12), focus ring (CampaignInput.tsx:39) | pages |
| purple section bg | `#8B5CF6` | Formats full-bleed bg (quick-ads/Formats.tsx:63); inner card frames `#7C54D6`, prompt bubble `#5D37B3` | pages |
| deep purple | `#601DB4` | footer panel bg (Footer.tsx:25) — matches DS `--juice-purple-deep` exactly | pages = DS |
| watermark purple | `#8948DE` | "got juice?" footer watermark (Footer.tsx:30), InAction step 02 color | pages |
| InAction image panel | `#5E25CF` | pinned image panel bg (InAction.tsx:265,287) | pages |
| lavender panel | `#F5F3FF` | BriefCarousel section (BriefCarousel.tsx:240), TwoParts cards (TwoParts.tsx:27), quick-ads Carousel panel/fade (Carousel.tsx:17,36), signal pills (Signals.tsx:247), Compare right card (Compare.tsx:104) | pages |
| lavender accents | `#AB86FF` engagement box (TwoParts.tsx:57); `#BBA0FF` footer buttons (Footer.tsx:52); `#EBE8FB` watermark numeral (TwoParts.tsx:32); `#EDE9FF` icon chip (Compare.tsx:104); `#C8B0FF` stat card (Stats.tsx:6) | purple-tint family | pages |
| stat card trio | `#C8B0FF` / `#FFB189` / `#FFE689` | quick-ads Stats cards (Stats.tsx:6–19) | pages |
| grey panel | `#F6F6F6` | AgenticTeam card (AgenticTeam.tsx:47), Stats/Adapt panels, d2c CTA card (CTA.tsx:9); Compare left card `#F8F8F8` (= `--color-cream`) | pages (theme.css:90) |
| dot-grid dots | `#D9D4EC` on lavender (globals.css:47); `rgba(255,255,255,0.16)` on purple (Formats.tsx:69) | section textures | pages |
| coral | `#F46C6C` waitlist panel (WaitlistPopup.tsx:197); error `#E0483F`; success yellow `#FFE94D` | waitlist modal | pages |
| neutrals | body `#1a1a1a` (globals.css:24); secondary `#535353`, `#666`; muted `#9a9a9a`, `#b0b0b0`, `#bfbfbf` (numerals), `#888`; hairlines `#e6e6e6` (Steps.tsx:46), `#e8e8e8` (CampaignInput borders), `#ededed`/`#cfcfcf` rails, `#d9d9d9` wires; `black/5`–`black/15` borders | text + border ladder | pages |
| shadcn base tokens | `--primary #030213`, `--muted #ececf0`, `--border rgba(0,0,0,0.1)`, `--ring oklch(0.708 0 0)`, dark-mode set | theme.css:3–79 — available to ui/ components, NOT used by marketing sections | pages |
| DS-only (usable for gaps) | `--juice-yellow-logo rgb(252,234,3)`, category accents: brand `#FE5C2B`, consumer `rgb(108,99,255)`, product teal `rgb(0,111,115)`, culture `rgb(239,68,68)`, grey scale 50–900 | filter tabs / category chips if ever needed | DS (tokens/colors.css) |

Section background treatments (recipes):
- White default: `bg-white` + `.container-juice`.
- Lavender full-bleed + dots: `dot-grid overflow-x-hidden bg-[#f5f3ff] py-20 sm:py-24 lg:py-28` (BriefCarousel.tsx:240).
- Grey rounded panel inside container: `overflow-hidden rounded-[12px] bg-[#f6f6f6] px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]` (Stats.tsx:26, Adapt.tsx:53); AgenticTeam variant `dot-grid … rounded-[28px] bg-[#f6f6f6]` (AgenticTeam.tsx:47).
- Yellow rounded card: `relative overflow-hidden rounded-t-xl bg-[#ffd950] px-6 py-16 sm:px-12 sm:py-24` (FAQ.tsx:88).
- Purple full-bleed + white dot texture + lemon bleeds: Formats.tsx:63–87.
- Deep purple footer: `rounded-t-[32px] bg-[#601db4]` (Footer.tsx:25).
- Lavender rounded-top panel: `rounded-t-[12px] bg-[#f5f3ff] px-5 pt-[60px]` (quick-ads/Carousel.tsx:17).

## Typography
CRITICAL naming trap: on these pages the utility `font-body` = **Rethink Sans** (used for ALL headings/display) and `font-display` = **Space Grotesk** (used for ALL body/label copy) — theme.css:91–92. Follow the pages' convention, not the words.

| role | family | size | weight | line-height | tracking | source |
|---|---|---|---|---|---|---|
| hero display (h1) | Rethink Sans (`font-body`) | `clamp(2.7rem,8.55vw,7.65rem)` landing (Hero.tsx:349); `clamp(2.75rem,8.6vw,8rem)` d2c; `clamp(3.75rem,9.3vw,134px)` quick-ads | 800 (`font-extrabold`) | 0.9–0.92 | `-0.01em`…`-0.02em` | pages |
| statement heading (h2 XL) | Rethink Sans | `clamp(2.5rem,5.5–8.34vw,4–7.5rem)` (Creativity.tsx:133, AgenticTeam.tsx:49, InAction.tsx:184, Compare.tsx:90, Signals.tsx:206) | 700–800 | 0.9–1.05 | `-0.02em` | pages |
| section heading (h2 M) | Rethink Sans | `clamp(1.875rem,4vw,3rem)` (Creatives.tsx:23, Features.tsx:55, TwoParts.tsx:75, FAQ.tsx:105); `clamp(2.25rem,4.4vw,64px)` bold variant (Stats.tsx:29) | 500 (medium) / 700 | 1.1–1.2 | none | pages |
| card title (h3) | Rethink Sans | `text-2xl`/`text-[28px]` (Creatives.tsx:47); `text-lg`/`xl` (Features.tsx:82); `text-[32px]` (Compare.tsx:65) | 500–700 | tight–1.2 | none | pages |
| step title | Rethink Sans | `clamp(1.75rem,2.6vw,2.75rem)` (InAction.tsx:150); `clamp(2rem,2.8vw,2.5rem)` (Steps.tsx:59) | 700 | 0.9–1.04 | none | pages |
| body / lede | Space Grotesk (`font-display`) | 14–20px; lede `text-[20px] leading-[1.41]` (InAction.tsx:189, Compare.tsx:95); card body `text-[15–16px] leading-[1.41–1.5]` (Steps.tsx:62, InAction.tsx:169); small `text-sm leading-relaxed` (Features.tsx:83) | 400–500 | 1.37–1.5 | none | pages |
| eyebrow / label (UPPERCASE) | Rethink Sans | card label `text-2xl font-semibold tracking-[0.04em]` (Creativity.tsx:60 — CONTENT/CREATORS/COMMERCE); step eyebrow `text-[32px]` numeral + `text-[20px] font-semibold uppercase` colored (InAction.tsx:142–143); stats eyebrow `text-[20px] uppercase tracking-[0.4px] text-[#535353]` (Stats.tsx:56) | 500–600 | 1–1.24 | +0.04em / 0.4px | pages |
| button label | Space Grotesk (`font-display`) | 14–20px, `leading-none` | 700 (`font-bold`) | 1 | none | pages |
| chip/pill | Space Grotesk | `text-[16px] leading-[1.05]` (Signals.tsx:247); `text-[14px]` mobile | 400–500 | ~1.05 | none | pages |
| watermark display | Anton (`'Anton', sans-serif` inline) footer "got juice?" `clamp(46px,13vw,240px)` uppercase leading-[0.8] (Footer.tsx:29–30); Archivo Black waitlist headings `clamp(1.9rem,5.5–6vw,3.25–3.4rem)` uppercase leading 0.95–0.98 (WaitlistPopup.tsx:15,172,201) | 400 (native-black faces) | 0.8–0.98 | -0.02em / +0.01em | pages |
| giant numerals | Space Grotesk `font-display` `clamp(150px,17vw,242px)` `text-[#ebe8fb]` (TwoParts.tsx:32); `clamp(72px,9vw,135px)` `text-white/50` (Formats.tsx:53) | 700 | 0.9–1 | none | pages |
| carousel (ported) | Archivo (briefCarouselContent.ts:53) — only inside the Webflow-ported carousel | — | — | — | pages |
| base element defaults | h1–h4/label/button via `--text-2xl…base`, weight 500, lh 1.5 (theme.css:152–186) — overridden by section utilities | — | — | — | pages |

clamp() is the standard responsive-type mechanism — every heading uses `text-[clamp(...)]` with a vw middle term; body sizes are fixed px.

## Spacing & layout
- grid/base unit: Tailwind 4px scale; arbitrary px values common (Figma-transcribed: 52px, 61px, 67px, 86px, 100px).
- section vertical rhythm: white sections `py-16 lg:py-[100px]` (quick-ads pattern) or `py-20 sm:py-24` / `pt-20 pb-16 sm:pt-24 sm:pb-20` (landing pattern); tight sections `py-8 sm:py-10` (AgenticTeam), `py-9 sm:py-11` (TrustedLogos). Heading→content gap: `mt-10`–`mt-12`, `lg:mt-[52px]`/`lg:mt-16`.
- hero top offset (fixed nav clearance): `pt-[104px] sm:pt-[116px]` (landing, Hero.tsx:311) or `pt-[120px] sm:pt-[140px]` (d2c/quick-ads); nav height 86px (Nav.tsx:96); `scroll-padding-top: 100px` (globals.css:9); sticky offsets `top-[96px]`.
- container: `.container-juice` = `width:100%; max-width:1440px; margin-inline:auto; padding-inline:clamp(1.25rem,3.6vw,3.25rem)` (globals.css:38–43) — use on every section. Narrow variants: logo strip `max-w-[1040px] px-6` (TrustedLogos.tsx:38); prose caps via `max-w-[280–871px]` per block.
- rounded panels inside container get their own padding: `px-6 py-12 sm:px-10 lg:px-[52px] lg:py-[100px]`.
- card grid gaps: `gap-3` (12px — image/stat/comparison card grids), `gap-5` (Creativity stack), `gap-x-8 gap-y-12 sm:gap-x-10` (Features).
- spacing tokens in use: 4/8/12/16/20/24/28/32/36/40/48/52/56/64/80/96/100/112px.
- DS reference (secondary): `--space-13: 52px` section rhythm, 4-based ramp — superseded by pages' values above.

## Radii, borders, shadows
| token | value | usage | source |
|---|---|---|---|
| pill | `rounded-full` (9999px) | ALL buttons/CTAs, signal pills, icon buttons, inputs (waitlist `h-12 rounded-full`) | pages |
| card sm | 8px `rounded-[8px]` | framed ad cards (Formats.tsx:11, Adapt.tsx:20) — inner img 5–6px | pages |
| card | 11–12px `rounded-[11px]`/`rounded-[12px]`/`rounded-xl` | ad tiles, grey/stat/comparison panels, TwoParts cards, InAction image panel | pages |
| card md | 14–16px `rounded-[14px]`/`rounded-2xl` | Creatives image cards (Creatives.tsx:39), Creativity cards (Creativity.tsx:53), CampaignInput (CampaignInput.tsx:39), nav dropdown | pages |
| panel lg | 20–28px | Creatives section top `rounded-t-[20px]` (Creatives.tsx:16), AgenticTeam `rounded-[28px]`, carousel card 24px | pages |
| hero/footer | 30–34px | hero frame `rounded-[clamp(18px,2vw,34px)]` (Hero.tsx:34), footer + modal `rounded-t-[32px]`/`rounded-[32px]` | pages |
| borders | hairline real borders (not inset rings): `border-black/5` (nav), `border-black/6`–`/8` (Creativity cards), `border-black/15` (FAQ dividers), `border-[#e6e6e6]` (Steps dividers), `border-[#e8e8e8]` (input controls), `border-white`/`border-white/90` 1–2px (framed ad cards, D2C pill), `border-[#111112]` (waitlist pill buttons) | pages (DS's `inset 0 0 0 1px` ring style NOT used; CampaignInput uses `ring-1 ring-black/5`) | pages |
| shadow-input | `0_4px_8px_rgba(0,0,0,0.04)` + `ring-1 ring-black/5` | CampaignInput.tsx:39 | pages |
| shadow-card-active | `0_20px_50px_-24px_rgba(0,0,0,0.25)` | expanded Creativity card (Creativity.tsx:54) | pages |
| shadow-dropdown | `0_30px_80px_-20px_rgba(0,0,0,0.5)` | nav dropdown panel (Nav.tsx:168) | pages |
| shadow-modal | `0_30px_90px_-20px_rgba(0,0,0,0.5)` | waitlist modal (WaitlistPopup.tsx:144) | pages |
| shadow-sm/lg (tw) | `shadow-md`/`shadow-lg` | D2C Moxie pill, founder portrait (d2c/Hero.tsx:56,63) | pages |
| carousel shadows | `-4px 4px 4px 0 #505D6314`; dots `0 4px 14px rgba(0,0,0,0.08)` | ported carousel only | pages |
| DS elevation (gap-filler) | `--shadow-xs/sm/md/card/pop` (tokens/radii.css) | only if a needed elevation has no page precedent | DS |

## Motion
Library: `motion` package (`motion/react`) — motion.div/AnimatePresence; plus 2 CSS keyframes (`marquee`, `qa-stream`).

| token | duration/easing | usage | source |
|---|---|---|---|
| `fadeUp` | opacity 0→1, y 28→0; 0.6s `[0.22,1,0.36,1]` | standard section reveal; pair `initial="hidden" whileInView="show" viewport={revealViewport}` | pages (lib/motion.ts:7–14) |
| `staggerParent` | staggerChildren 0.08, delayChildren 0.05 | card grids | pages (lib/motion.ts:17–22) |
| `revealViewport` | `{ once: true, margin: "-80px" }` | all scroll reveals | pages (lib/motion.ts:25) |
| CTA hover | `transition-transform duration-200 hover:scale-[1.03]` (1.04 footer, 1.05 send) | all pill buttons | pages |
| link/nav hover | `transition-opacity hover:opacity-70`; `transition-colors hover:text-white` (footer links); `hover:bg-neutral-50`/`hover:bg-black/5` washes on ghost controls | nav links, footer, icon buttons | pages |
| card hover | `transition-transform duration-300 hover:-translate-y-1` (Creatives.tsx:39); `transition-shadow duration-300` (Creativity.tsx:53) | image cards | pages |
| accordion | height/opacity 0.35s `[0.4,0,0.2,1]` (FAQ.tsx:71) | FAQ | pages |
| card expand | 0.45s `[0.4,0,0.2,1]` (Creativity.tsx:49) | scroll-pinned cards | pages |
| dropdown | 0.2s easeOut, y −8 fade (Nav.tsx:162–165); mobile menu 0.28s height | nav | pages |
| marquee | `marquee 64s linear infinite`, pause on `:hover`, `.edge-fade` mask (globals.css:52–87) | TrustedLogos | pages |
| scroll pinning | Hero: 260vh track, spring(stiffness 60, damping 26) scrub → full-viewport spotlight; Creativity: 280vh, `sticky top-[96px]`, active card by progress thirds; InAction: measured travel, image crossfade 0.35s ease | signature scroll behavior | pages |
| wire stream | `qa-stream` 3–5.4s linear infinite, dash segment (Signals.tsx:83–107); insight cycle every 1500ms | Signals diagram | pages |
| headline sweep | gradient text bg-position 0→100%, 2.1s `[0.16,1,0.3,1]` (Hero.tsx:69–95) | hero h1 | pages |
| reduced motion | global kill: all animation/transition → 0.001ms; marquee off; scroll-behavior auto (globals.css:90–105); every component checks `useReducedMotion()` and disables pinning/autoplay | mandatory on new pages | pages |

## Breakpoints (from config — restate for self-containment)
No .page-pipeline/config.json breakpoints found; pages use Tailwind v4 defaults + one JS breakpoint.

| name | width |
|---|---|
| sm | 640px |
| md | 768px (rarely used) |
| lg | 1024px (primary desktop switch; also JS `matchMedia("(min-width: 1024px)")` gates all scroll-pinning) |
| xl / 2xl | 1280 / 1536px (not used by sections) |
| design canvas | 1440px (container max) |

## Component inventory (as used on published pages)
| component | variants seen | states seen | source file(s) |
|---|---|---|---|
| Nav | transparent → scrolled (`border-b border-black/5 bg-white/85 backdrop-blur-md`); mobile hamburger (`size-10 rounded-full bg-ink`) + slide-down menu; (dropdown menus built but commented out pre-launch) | scrolled, open, hover opacity-70 | Nav.tsx:88–211 |
| Primary CTA | nav: `rounded-full bg-[#333] px-6 py-[15px] font-display text-[16px] font-bold leading-none text-white transition-transform duration-200 hover:scale-[1.03]`; large: `px-7 py-5 text-[20px]` (d2c/CTA.tsx:43) | hover scale | Nav.tsx:133 |
| Secondary CTA | footer lavender: `rounded-full bg-[#bba0ff] px-6 py-3.5 font-display text-sm font-bold leading-none text-[#444] … hover:scale-[1.04]` | hover scale | Footer.tsx:52 |
| Pill+arrow button | `rounded-full border border-[#111112] py-1.5 pl-5 pr-1.5 hover:bg-black/5` + inner `size-8 rounded-full bg-[#111112] text-white` arrow circle; `disabled:opacity-60` | hover wash, disabled | WaitlistPopup.tsx:182,269 |
| Icon circle button | `size-8 rounded-full border border-[#e8e8e8] text-neutral-500 hover:bg-neutral-50`; send: `bg-[#333] text-white hover:scale-105`, sent → `bg-green-600` | hover, sent | CampaignInput.tsx:58–86 |
| Carousel arrow button | `size-[38px] rounded-full border border-[#444] text-[#444]` | static | Adapt.tsx:35–47 |
| CampaignInput (prompt box) | white card `max-w-[756px] rounded-2xl p-5 shadow ring-1 ring-black/5`, textarea + attach/brand/mic/send row | `focus-within:ring-2 ring-[#9165f5]` | CampaignInput.tsx:39–89 |
| Form input | `h-12 rounded-full border-2 border-[#212121]/10 px-5 font-display text-[15px]`; focus `border-[#212121]/35`; error `border-[#f46c6c]` + 13px `#e0483f` message | focus, error | WaitlistPopup.tsx:46–49 |
| Image card | `overflow-hidden rounded-[14px]` + `aspect-[437/375] object-cover` + `hover:-translate-y-1` | hover lift | Creatives.tsx:39–45 |
| Expanding card | `rounded-2xl border border-black/6 bg-white`; expanded adds `border-black/8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)]`; grid `[360px_1fr]` | collapsed/expanded | Creativity.tsx:52–121 |
| Feature item | 68px circle badge `#8656F4` + `#9165F5` squiggle + white Lucide icon (strokeWidth 1.75) + title + sm body | reveal | Features.tsx:67–86 |
| Stat card | `min-h-[232px] rounded-[12px] px-8 py-[53px]` colored bg + `text-[60px] font-bold` stat + 20px caption | static | Stats.tsx:39–52 |
| Comparison card | `rounded-[12px] p-8` bg `#f8f8f8`/`#f5f3ff`, h3 32px, `h-px bg-black/10` divider, rows of `size-10 rounded-[4px]` icon chips | static | Compare.tsx:52–105 |
| Framed ad card | `rounded-[8px] border border-white/90 bg-[#7c54d6] p-[4px]` + inner `rounded-[5px]` img | static | Formats.tsx:8–21, Adapt.tsx:16–33 |
| FAQ accordion | `border-t border-black/15` rows, `py-6` trigger, plus/minus icon (vertical bar scaleY), one-open | open/closed | FAQ.tsx:37–79 |
| Chip / signal pill | `rounded-[12px] bg-[#f5f3ff] px-4 py-2 font-display text-[16px] text-[#444]` | active vs dimmed (`text-[#b0b0b0]`) | Signals.tsx:243–251 |
| Logo (wordmark) | SVG paths, recolor via `fill`: `#F78146` nav (h-[50px]), `#F296AF` footer (h-[52px] sm:h-[64px]) | — | Logo.tsx, Nav.tsx:41, Footer.tsx:37 |
| Footer | deep-purple rounded-top panel, Anton watermark, can image overlap (`lowCan` prop variant), buttons, legal links white/80→white | lowCan variant | Footer.tsx |
| Waitlist modal | `z-[80] bg-black/45 backdrop-blur-sm` overlay, `max-w-[1000px] rounded-[32px]` card; coral form state + yellow success state | form, success, busy, errors | WaitlistPopup.tsx |
| Logo marquee | `.marquee-mask .edge-fade` + `.marquee-track flex w-max gap-x-16`, imgs `opacity-60`, per-logo heights 24–42px | hover-pause | TrustedLogos.tsx |
| Pricing tables / forms (other) | none found beyond above | — | — |

## Section patterns (page-level building blocks)
| pattern | appears on | structure summary |
|---|---|---|
| Scroll-spotlight hero | / | pinned 260vh track; gradient-sweep h1; yellow-framed (#FFD950, 3.4% padding) video rises → full-viewport spotlight → shrinks; mobile = static framed autoplay video (Hero.tsx) |
| Overlap-collage hero | /d2c | giant 3-line h1 overlapping right-aligned image card + bleeding pill + portrait; `pt-[120px] sm:pt-[140px]` (d2c/Hero.tsx) |
| Wordmark hero | /quick-ads | h1 wordmark + bold tagline left, 20px supporting para right, bottom-aligned row (quick-ads/Hero.tsx) |
| Logo strip | / | narrow (1040px) infinite marquee, edge-fade, opacity-60 (TrustedLogos.tsx) |
| Prompt/demo panel | /, /quick-ads | lavender `#f5f3ff` panel (+dot-grid on /) with heading + CampaignInput + content grid fading at bottom gradient (BriefCarousel.tsx, quick-ads/Carousel.tsx) |
| 3-up image-card grid | / | medium h2 + `grid sm:2 lg:3 gap-3` image cards with h3 labels below (Creatives.tsx) |
| Scroll-pinned expanding cards | / | h2 + right-aligned lede; 280vh track, sticky stack of 3 cards, active expands (UPPERCASE eyebrow labels) (Creativity.tsx) |
| Icon feature grid | / | medium h2 + `grid-cols-2 lg:3` items: purple circle badge + title + body (Features.tsx) |
| Watermark statement panel | / | grey dot-grid rounded panel, hero-scale headline, rotating dial+ring art clipped to corner (AgenticTeam.tsx) |
| 2-up offer cards | / | medium h2 + two lavender `min-h-[560px]` cards: watermark numeral, h3, numbered list, purple engagement box (TwoParts.tsx) |
| FAQ band | / | yellow rounded card: heading left (440px), accordion right (max-w 774px), orange fruit image bleed (FAQ.tsx) |
| Split heading + visual | / | left heading+lede (300px), right large image (Jam.tsx) |
| Numbered divider grid | /d2c | full-bleed hairline rows, 3-col cells inside gutters: grey numeral top-right, bold title, body (Steps.tsx) |
| Pinned step scroller | /d2c | heading + lede row; left pinned image panel (#5e25cf) swapping per step, right scrolling numbered steps with colored rail, white edge fades (InAction.tsx) |
| CTA band | /d2c | grey rounded card: lemon bleed left, h2 with purple keyword, stacked copy, dark pill CTA (CTA.tsx) |
| Flow diagram | /quick-ads | measured SVG wires + diamonds connecting pill column → insights → ad image; vertical labels; auto-cycling highlight (Signals.tsx) |
| Stats panel | /quick-ads | grey panel: heading+lede row, 3 colored stat cards, eyebrow + mixed-weight statement (Stats.tsx) |
| Purple showcase | /quick-ads | full-bleed #8b5cf6 + white dots + lemon bleeds; numbered rows of framed ad cards with giant white/50 numerals (Formats.tsx) |
| Aspect-adapt row | /quick-ads | grey panel: Original card + horizontally scrolling Adapts with ratio labels + arrow buttons (Adapt.tsx) |
| Comparison band | /quick-ads | XL heading + lede; two comparison cards side by side (Compare.tsx) |
| Footer band | all | deep purple rounded-top, pink wordmark + 32px lede, watermark, buttons bottom-right, overlapping can (Footer.tsx) |

## Interaction patterns
- hover: buttons **scale up** (`hover:scale-[1.03]`–`[1.05]`, `transition-transform duration-200`) — never darken; text links fade (`hover:opacity-70`) or recolor (`white/80 → white`); ghost/icon controls take a light wash (`hover:bg-neutral-50`, `hover:bg-black/5`); image cards lift (`hover:-translate-y-1`, 300ms); marquee pauses.
- active/pressed: none defined — do not invent.
- focus: `focus-within:ring-2 ring-[#9165f5]` on the prompt box; inputs `focus:border-[#212121]/35` (2px border); global base `outline-ring/50` (theme.css:136). Icon/CTA buttons rely on default outline.
- disabled: `disabled:opacity-60` (WaitlistPopup.tsx:269) — only pattern seen.
- transitions default: 200ms transforms, 200–300ms colors/opacity; content expand 0.35–0.45s `cubic-bezier(0.4,0,0.2,1)`; reveals 0.6s `[0.22,1,0.36,1]`; always guard with `useReducedMotion()` + global reduced-motion CSS.

## Iconography & imagery
- icon set: mostly hand-inlined SVGs, 1.4–2px stroke, `currentColor` or `#444`/`#333`, 12–24px viewBoxes (carets, plus/minus, arrows, mic, check — Nav.tsx:19, FAQ.tsx:37, CampaignInput.tsx:94–129, Compare.tsx:6–34). Lucide React used once at strokeWidth 1.75, white, inside purple badges (Features.tsx:2,79). DS 44-glyph `Icon` set available as secondary for product-surface glyphs.
- imagery: PNG imports from `src/imports/**`; fixed aspect ratios via `aspect-[w/h]` + `object-cover`; wrapped in `overflow-hidden rounded-[8–14px]` cards; always `draggable={false}` (+ `select-none`); decorative brand props (lemons, can, oranges) absolutely positioned, bleeding off edges with slight rotation, `pointer-events-none` + `aria-hidden`/empty alt; fade-outs via `bg-gradient-to-t from-<section-bg>` overlays; framed media = colored padding box (yellow hero frame, `#7c54d6` ad frames, white 1–2px borders).
- brand assets referenced: `src/imports/` (hero-v1-poster.png, footer-can.png, jul3/logos/*.png, 5Jun/{agents-ring,jam-visual,creators}.png, d2c/*.png, quick-ads/*.png, waitlist/lemon-stack.png); public/hero.mp4. DS bundle `assets/brand/` available as secondary.

## Fonts & licenses (from config — restate)
| family | source | license |
|---|---|---|
| Rethink Sans (headings — utility `font-body`), 400–800 | Google Fonts (fonts.css:1) | OFL |
| Space Grotesk (body — utility `font-display`), 300–700 | Google Fonts | OFL |
| Anton (footer watermark) | Google Fonts | OFL |
| Archivo Black / Archivo (waitlist display / ported carousel) | Google Fonts | OFL |
| Bowlby One (+ 'HighriseDemo' alias, fonts.css:3–12) | Google Fonts | OFL |
| Plus Jakarta Sans, Inter, Manrope, PT Serif | loaded (fonts.css:1) but unused by published sections; keep loaded | OFL |

## Accessibility baseline observed
- Landmarks: `<header>` fixed nav, `<main>` around sections, `<footer>`; sections carry `id` anchors (`#features`, `#faq`, `#twoparts`…) with `scroll-padding-top: 100px` clearance.
- Reduced motion honored twice over: global CSS kill (globals.css:90–105) AND per-component `useReducedMotion()` fallbacks (static layouts replace pinned/scrubbed ones).
- Icon-only buttons always get `aria-label`; accordions/menus use `aria-expanded` (+ `aria-haspopup`); modal uses `role="dialog" aria-modal aria-label`, Escape to close, focus moved to first field, body scroll locked.
- Decorative images: `aria-hidden` / empty alt; meaningful images have descriptive alt.
- Contrast: dark ink (#333/#444) on white/tinted panels; white text on #601db4/#8b5cf6; watermark/dim text is decorative only. Low-contrast pairs (white/50 numerals, #b0b0b0 dimmed insights) are never the sole carrier of information.
- Forms: labels bound via htmlFor/id, inline error messages, `noValidate` with JS validation, autocomplete attributes.
