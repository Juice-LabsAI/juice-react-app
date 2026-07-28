# Discrepancy report — /pov namespace + Gen Z India

Iteration 2 (final). Iteration 1 found one defect; it is fixed and re-verified below.
Evidence: `screenshots/iter-2/` — 4 breakpoints × 6 scroll positions for the report,
4 breakpoints for the handbook, plus interaction and leak-check captures.

## Routing matrix — every route requested, where it landed

| requested | landed | renders | status |
|---|---|---|---|
| `/pov` | `/` | homepage | resolved |
| `/pov/CMO-Handbook` | `/pov/CMO-Handbook` | Brand OS Readiness | resolved |
| `/pov/cmo-handbook` | `/pov/cmo-handbook` | Brand OS Readiness (case-insensitive match) | resolved |
| `/pov/genz-india` | `/pov/genz-india` | Gen Z India report | resolved |
| `/pov/does-not-exist` | `/` | homepage | resolved |
| `/CMO-Handbook` (legacy) | `/pov/CMO-Handbook` | Brand OS Readiness | resolved |
| `/cmo-handbook` (legacy, lowercase) | `/pov/CMO-Handbook` | Brand OS Readiness | resolved |
| `/`, `/d2c`, `/quick-ads`, `/creators`, `/redeem`, `/admin-leads`, `/terms-conditions`, `/privacy-policy` | unchanged | unchanged | resolved |

## Findings

| element | property | expected | actual | source | status |
|---|---|---|---|---|---|
| hero byline card + footer logo | `img src` | Juice wordmark | broken image, alt text showing — only the first of 3 `__LOGO_SRC__` placeholders was substituted (`String.replace` replaces one occurrence) | approved design | **fixed** iter-2 → `replaceAll`; 3/3 images load, 0 broken |
| `<body>` | `background` | `#0d0b1e` (report `--night`) | `rgb(13, 11, 30)` at all 4 breakpoints | approved design | resolved |
| document | horizontal overflow | none | `scrollWidth − clientWidth = 0` at 390 / 768 / 1280 / 1536 | approved design | resolved |
| `#track .fill` / `.loco` | scroll progress | tracks scroll | `17.68%` at part-two; loco follows | approved design | resolved |
| `nav .stations a.on` | active station | highlights current part | `02 Behaviours` active at part-two | approved design | resolved |
| `.rv` elements | reveal on scroll | all reveal | `111/111` reached `.in` | approved design | resolved |
| egg 1 (`#hornBtn`) | toast + train | toast shows | `eggToast.show === true` | approved design | resolved |
| egg 3 (Konami) | `body.maxneon` | toggles | `true` after ↑↑↓↓←→←→BA, `false` after repeat | approved design | resolved |
| egg 2 (`#papdiWord`) | fly animation | handler bound | listener attached, `#papdi` present | approved design | resolved |
| browser console | errors | zero | zero errors, zero page errors across all routes | — | resolved |
| CMO lead capture at new URL | RPC | `submit_cmo_lead` | `POST …/rest/v1/rpc/submit_cmo_lead` fired; results revealed | existing behaviour | resolved |
| `/cmo-guide.pdf` | download href | root-relative, unaffected by nesting | present in build output at `/cmo-guide.pdf` | existing behaviour | resolved |
| `CMOHandbook.tsx`, `AdminLeads.tsx`, `src/app/lib/**` | diff | untouched | `git diff` returns nothing for all three | blast radius | resolved |
| route unmount | style leak | none | after navigating home: body `rgb(255,255,255)`, `maxneon` removed, title restored, 0 report `<style>` tags, 0 report font links | — | resolved |

## Accessibility (report page)

| check | result |
|---|---|
| images with `alt` | 3/3 |
| landmarks | `nav` 1, `header` 1, `main` 1, `footer` 1 |
| headings | exactly one `h1` |
| `html lang` | `en` |

## Social previews (iteration 3)

| check | expected | actual | status |
|---|---|---|---|
| crawler fetch of `/pov/genz-india` (no JS, UA `facebookexternalhit`) | report title + `og:url` | `<title>The First Generation…</title>`, `og:url=https://www.juicelabs.ai/pov/genz-india`, `og:type=article` | resolved |
| crawler fetch of `/` | house card unchanged | `Creative Performance OS \| Juice AI`, `og:type=website` | resolved |
| crawler fetch of `/pov/CMO-Handbook` | house card (not prerendered) | house card | resolved |
| canonical | points at the route | `https://www.juicelabs.ai/pov/genz-india` | resolved |
| direct hit renders for humans | identical to before | React mounts, dark theme, 3/3 images, easter egg fires | resolved |
| client-side nav away from the route | tab title returns to site default | `Juice AI` + site description restored | resolved |
| homepage after full load | untouched | `Juice AI`, no canonical injected | resolved |
| console on prerendered entry | zero errors | zero | resolved |

Guard: `scripts/prerender-meta.mjs` throws if a `<meta>` it expects to override is
missing from `index.html`, and the ship script asserts the tag is in the build output —
so this can't regress silently into shipping the wrong card.

## Deviations kept on purpose

| item | note |
|---|---|
| `html { scroll-padding-top: 100px }` | inherited from the site's `globals.css`; the standalone export had none, so anchors previously landed under the report's fixed nav. Kept — it is strictly better. |
| `og:image` | still the house `og-image.png` — a bespoke card was deferred by choice. Title and description are route-specific; the image is not. |
| other routes not prerendered | `/`, `/d2c`, `/quick-ads`, `/creators`, `/pov/CMO-Handbook` keep the generic card. Scope was limited to the report; the mechanism covers them whenever copy is written. |

## Verification caveat

Fidelity was proven against the **production build** (`vite build`) served through a
local server that replays `vercel.json`'s redirect + SPA-rewrite rules, because the
sandbox cannot run the mounted `node_modules` (macOS binaries). This tests the config
semantics, not Vercel itself — worth one smoke-check of `/CMO-Handbook` on the
preview deploy after merge.
