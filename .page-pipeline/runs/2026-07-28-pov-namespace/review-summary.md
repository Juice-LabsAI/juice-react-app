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

Two things deliberately left:

- **The image is still the house `og-image.png`.** You chose to skip a bespoke card for
  now — the title and description are right, but the picture won't say which page it is.
  `seo.config.mjs` has an `image` field ready for when you want one.
- **Only this route is prerendered.** `/`, `/d2c`, `/quick-ads`, `/creators` and
  `/pov/CMO-Handbook` still share the generic card. The mechanism now exists for all of
  them whenever you want to write the copy.
