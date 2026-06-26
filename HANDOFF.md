# Handover: Campaign prompt handoff (landing page → creative tool)

## Goal
When a user types a campaign prompt on the **landing page** (`juicelabs.ai`) and hits
submit, we (a) send them to the tool's login page `https://creative.juicelabs.ai/`,
and (b) pre-fill that same text into the tool once they're signed in.

## Why it's not just localStorage
`juicelabs.ai` and `creative.juicelabs.ai` are **different origins** → no shared
`localStorage`/`sessionStorage`. And login may bounce through an external IdP, which
can strip URL params. So we pass the value via **two channels** and the tool reads
whichever survives.

## Contract
- **Key (both sides must match):** `juice_prompt`
- **Channel 1 — URL param:** redirect is `https://creative.juicelabs.ai/?juice_prompt=<URL-encoded text>`
- **Channel 2 — cookie:** `juice_prompt=<encoded>`, `domain=.juicelabs.ai`, `path=/`,
  `SameSite=Lax`, `Secure`, `max-age=1800` (30 min). Shared because both subdomains
  sit under `juicelabs.ai`.

## Landing page — DONE (no action needed)
Implemented in `src/app/sections/Campaign.tsx` (`handoffToTool()`). On submit it writes
both the cookie and the query param, then redirects.

> Note: the `.juicelabs.ai` cookie is only accepted on a real `juicelabs.ai` host — on
> `localhost` only the query param works; the cookie kicks in once deployed.

## Tool side — YOUR ACTION
After the user reaches the **authenticated** app, read the prompt once, seed it into the
campaign input, then clear it (so a refresh doesn't re-fill):

```js
const HANDOFF_KEY = "juice_prompt";

function readHandoffPrompt() {
  const fromUrl = new URLSearchParams(location.search).get(HANDOFF_KEY);
  const fromCookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(HANDOFF_KEY + "="))
    ?.split("=")[1];

  const prompt = decodeURIComponent(fromUrl ?? fromCookie ?? "");
  if (!prompt) return null;

  // consume once
  document.cookie = `${HANDOFF_KEY}=; domain=.juicelabs.ai; path=/; max-age=0`;
  const url = new URL(location.href);
  url.searchParams.delete(HANDOFF_KEY);
  history.replaceState({}, "", url);

  return prompt;
}
```

## Decision you need to make: *where* to call it
- **SPA login that keeps the URL** through sign-in → call on first authenticated render.
- **Redirect through external IdP** (Google etc.) → URL param is lost; the **cookie** is
  what survives → call right after the auth callback resolves.

## Notes / edge cases
- 30-min TTL → stale prompts auto-expire.
- Cap length if you persist server-side (prompts are free text).
- No PII; fine in a cookie. Keep `Secure` so it's HTTPS-only.
- Currently only the **prompt text** is passed — *not* the "Select a Brand" choice
  (can be added to the same handoff later if needed).
