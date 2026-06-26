# Juice — Landing Page (React)

Your original Figma Make export, cleaned up and made deploy-ready so it can run as a real React site (off Webflow).

## Run locally

```bash
npm install
npm run dev      # Vite dev server, usually http://localhost:5173
```

## Build

```bash
npm run build    # static output in ./dist
npm run preview  # preview the production build
```

## Deploy (pick one)

**Vercel** (recommended)
```bash
npm i -g vercel
vercel           # framework auto-detected as Vite
```
…or push this folder to Git and "Import Project" in the Vercel dashboard. `vercel.json` is included.

**Netlify**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```
…or drag the built `dist/` folder onto https://app.netlify.com/drop. `netlify.toml` is included.

Then point `juicelabs.ai` (or a subdomain) at the deployment.

---

## What was fixed vs. the raw Figma Make export

1. **Fonts now actually load.** Every text style referenced a broken family name
   like `font-['Space_Grotesk:Bold']` — the `:Bold` suffix isn't a real font, so
   text silently fell back to the browser default. Stripped that suffix on all 258
   references so the real faces resolve, and consolidated everything to your two
   fonts: **Rethink Sans** (body/UI) and **Space Grotesk** (display). The "got
   juice" display face maps to Bowlby One (closest free match — swap if you license
   the original). Weights were already correct utilities, so they're unchanged.
2. **Build won't fail on a fresh install.** `react` / `react-dom` were listed as
   *optional peer* dependencies, so `npm install` wouldn't install them. Moved them
   into real `dependencies`.
3. **Mobile no longer overflows.** The design is a fixed 1440px canvas; added a
   scale-to-fit wrapper in `src/app/App.tsx` so it shrinks to fit any screen instead
   of forcing horizontal scroll on phones.
4. **Deploy config added** — `vercel.json`, `netlify.toml`, `.gitignore`.

## Known limitations / next steps

- **Not truly mobile-responsive yet.** It scales to fit (no horizontal scroll), but
  it's the desktop layout shrunk, not reflowed. A real mobile layout is a separate,
  larger effort because the export is absolutely-positioned.
- **Not build-verified in the chat sandbox** (no npm network there), so the first
  `npm install && npm run build` on your machine or Vercel is the real check. If
  anything errors, send me the output and I'll fix it.
- The seven interactions (carousels, stacking cards, dial, accordions) can now be
  built on this real codebase — where they actually belong.
