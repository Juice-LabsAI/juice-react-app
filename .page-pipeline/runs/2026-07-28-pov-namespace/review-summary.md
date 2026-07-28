# Review summary — /pov namespace + Gen Z India report

## What changed

**Routing (`src/main.tsx`)**

| URL | behaviour |
|---|---|
| `/pov/CMO-Handbook` | the handbook, at its new home |
| `/pov/genz-india` | the Gen Z India report (new) |
| `/pov` | redirects to the homepage — index page to be designed later |
| `/pov/*` (anything unknown) | redirects to the homepage, so the namespace has no dead ends |
| `/CMO-Handbook` | redirects to `/pov/CMO-Handbook` |

Route matching in react-router is case-insensitive, so `/pov/cmo-handbook` resolves too.

**Redirects (`vercel.json`, `netlify.toml`)** — the legacy URL gets a real server-side
301/308 rather than relying on the SPA, so search engines transfer the old URL's
authority to the new one instead of seeing two live pages. The client-side
`<Navigate replace>` in the router is the fallback for local dev and any host that
skips the config.

**Gen Z India report** — `src/app/PovGenzIndia.tsx`. The markup and CSS were lifted
out of your HTML export mechanically (not retyped) into `src/app/pov/genzIndiaContent.ts`,
so the page is byte-identical to what you approved. The inline base64 logo became a
real asset at `src/imports/pov/genz-logo.png` so Vite can cache and serve it. The
original `<script>` — progress bar, reveals, active nav station, three easter eggs,
hero glitch — is ported into one effect that tears itself down on unmount.

## Nothing broken — what was checked

- **Admin leads page** — untouched. It reads leads over Supabase RPCs
  (`admin_list_cmo_leads` and friends), which have no relationship to the page's URL.
  `git diff` on `AdminLeads.tsx` is empty.
- **CMO lead capture** — driven end to end at the new URL: quiz completed → lead gate
  appeared → submit fired `POST …/rest/v1/rpc/submit_cmo_lead` → results revealed.
  Same RPC, same `cmo_leads` table, so the admin tab keeps filling.
- **Guide PDF** — `a.href = "/cmo-guide.pdf"` is root-relative, so nesting the page one
  level deeper doesn't affect it. Confirmed present in the build output.
- **Every other route** — `/`, `/d2c`, `/quick-ads`, `/creators`, `/redeem`,
  `/admin-leads`, `/terms-conditions`, `/privacy-policy` all still render correctly.
- **No style bleed** — the report's dark theme, fonts, title and `maxneon` class are
  all mounted with the route and removed on exit; the homepage is back to white with
  zero report styles left in the document.

## Evidence

2 iterations. Iteration 1 caught one real defect — the Juice logo appeared 3 times in
the report but only the first was substituted, so two rendered broken. Fixed and
re-verified: 3/3 images load.

`screenshots/iter-2/` — the report at 390 / 768 / 1280 / 1536 across six scroll
positions, the handbook at all four breakpoints, plus captures of the toast egg,
MAX NEON, the active nav station, and the homepage after navigating away.
Zero horizontal overflow at every breakpoint. Zero console errors on every route.
All 111 scroll reveals fire. All images carry alt text, one `h1`, landmarks present.

## Follow-up after 7170557 — wordmark sizing + footer copy

The Juice wordmark looked undersized and off-centre in all three placements. Cause:
the base64 logo in the export was a 520×355 PNG whose mark only occupied 410×263,
sitting 76px in from the left and 92px down from the top. Every `height:` rule was
therefore sizing transparent padding — the visible mark came out about 30% smaller
than asked for and pushed down-right of where it belonged.

Replaced with `src/imports/pov/genz-logo.svg`: the same artwork as the site's own
wordmark, tight viewBox, recoloured to `#874BFF` (sampled from the original raster).
The CSS heights are untouched at 26 / 34 / 36px — removing the padding is the whole
fix. Being vector, it's also crisp on retina, which the raster wasn't.

Rendered sizes are now identical at all four breakpoints (61×26, 80×34, 84×36), all
three load, no overflow, console clean.

Footer tagline changed from "AI-native ad creative & brand intelligence" to
"The Brand OS that generates content that outperforms".

## Social previews — fixed

Crawlers fetch HTML and never run the bundle, so in a single-page app every URL handed
them the homepage's card. `scripts/prerender-meta.mjs` now runs after `vite build` and
writes `dist/pov/genz-india/index.html` with that route's own title, description,
`og:`/`twitter:` tags and a canonical link. The host serves that real file instead of
falling through to the SPA rewrite, so the crawler reads the right tags and the app
still boots from it — visitors notice nothing.

`seo.config.mjs` holds the metadata and is imported by both the build script and the
route component, so the tab title and the shared card can't drift apart. Adding another
route later is one entry in that file.

Verified by fetching the page as `facebookexternalhit` with no JavaScript: the report's
title and `og:url` come back, while `/` and `/pov/CMO-Handbook` correctly still return
the house card. The build script also fails loudly if a `<meta>` it expects to override
goes missing, so a future edit to `index.html` can't quietly break this.

### The card

`public/pov/genz-india-og.png` — 1200×630, matching the `og:image:width/height` already
declared in `index.html`. It is a render of the report's own hero (eyebrow chip,
headline, Hindi line, subhead, briefing line) with the nav, logo card, stat cards,
skyline and scroll cue hidden. Produced from the live page rather than drawn
separately, so it can't drift from the design.

`scripts/og/render-genz-og.mjs` regenerates it. Run by hand, not wired into the build —
it needs a browser and the card only changes when the hero does. The headline size is
pinned at 92px with a comment explaining why: the wrap has to land as "THE FIRST /
GENERATION THAT / DOESN'T NEED YOU", and below ~90px it re-breaks and strands "YOU" on
a line of its own. The script refuses to write the file if the headline isn't on three
lines, so a copy change can't silently produce a worse card.

Verified end to end: a crawler fetch returns the card's absolute URL, and that URL
serves a real 1200×630 `image/png` rather than falling through to the SPA.

## Printed URLs removed, wordmark enlarged

The report printed its own address in four places — the label beside the nav wordmark,
`www.juicelabs.ai` under the hero byline, the same again in the footer card, and a
`JUICELABS.AI` link in the footer fine print. All four are gone. The link targets are
untouched: the nav wordmark, the hero card and the footer card are each still a single
`<a>` to juicelabs.ai, so the logo and the "Juice AI" text now carry the link. Build
asserts exactly three link targets survive, and that no URL is left as visible text.

With the labels gone, the wordmark went up — nav 26→34px, hero 34→44px, footer 36→46px.
The nav bar grows from 50 to 59px, still comfortably cleared by the header's 130px top
padding, and losing the label gives the station links more room on narrow screens. The
dead CSS went with it (`nav .brand span` and the `max-width:860px` rule that hid it).

Identical logo sizes at all four breakpoints, no overflow, console clean.

**Card render made deterministic.** Re-rendering the social card produced a 40×40px
diff each time — the eyebrow chip flickers on a 6s loop and the capture caught it at
different phases. The script now freezes animations before the screenshot; two
consecutive runs are byte-identical. The committed card was regenerated from that path,
with no change to its content.

### Still open

Only this route is prerendered. `/`, `/d2c`, `/quick-ads`, `/creators` and
`/pov/CMO-Handbook` still share the generic card. The mechanism covers them whenever
the copy and art are written.
