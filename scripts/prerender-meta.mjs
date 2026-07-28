/**
 * Post-build step: emit a static HTML entry per route in seo.config.mjs, with
 * that route's social tags baked in.
 *
 * Why this exists: the site is a single-page app, so every URL is served the same
 * index.html. Link crawlers (LinkedIn, WhatsApp, Slack, X, Facebook) fetch the HTML
 * and never execute the bundle, so they only ever saw the homepage's card no matter
 * which page you shared. Writing dist/<route>/index.html fixes that — the host serves
 * the real file, the crawler reads the right tags, and the app still boots from it
 * exactly as before, so visitors notice nothing.
 *
 * Run automatically by `npm run build`.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTE_META, SITE_ORIGIN, routeMeta } from "../seo.config.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Replace the content of a <meta>, or fail loudly. `\s+` spans newlines, so this
 * matches both the one-line tags and the wrapped ones index.html uses for the
 * longer descriptions. Failing loudly matters: a silent miss would ship a page
 * whose card is quietly wrong, and nobody would notice until it was shared.
 */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "i");
  if (!re.test(html)) {
    throw new Error(`index.html has no <meta ${attr}="${key}"> to override — update the template or this script.`);
  }
  return html.replace(re, `$1${escape(value)}$2`);
}

const template = readFileSync(join(DIST, "index.html"), "utf8");
const routes = Object.keys(ROUTE_META);

if (routes.length === 0) {
  console.log("prerender-meta: no routes configured, nothing to do.");
  process.exit(0);
}

for (const route of routes) {
  const meta = routeMeta(route);
  const url = SITE_ORIGIN + route;
  const image = meta.image.startsWith("http") ? meta.image : SITE_ORIGIN + meta.image;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escape(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "property", "og:type", meta.type);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);
  html = setMeta(html, "name", "twitter:image", image);

  // Canonical — tells search engines this URL is the real address of the page,
  // so the prerendered copy is never treated as a duplicate of the homepage.
  html = html.replace(/(\s*)<title>/i, `$1<link rel="canonical" href="${url}" />$1<title>`);

  const outDir = join(DIST, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  console.log(`prerender-meta: dist${route}/index.html  ←  "${meta.title}"`);
}

console.log(`prerender-meta: ${routes.length} route(s) written.`);
