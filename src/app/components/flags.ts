/* All flag-icons SVGs, keyed by uppercase ISO code, resolved to URLs by Vite.
   Small flags are inlined; only the larger ones become separate assets. */
const modules = import.meta.glob("/node_modules/flag-icons/flags/4x3/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const FLAGS: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const iso = path.slice(path.lastIndexOf("/") + 1, -4).toUpperCase();
  FLAGS[iso] = url as string;
}
