/* Where the campaign tool / login lives, resolved per environment.

   - Vite dev server (`npm run dev`): the locally-running tool on port 5174,
     reusing whatever host you opened the app on (localhost / 127.0.0.1 / LAN IP).
   - qc & prod builds: the deployed tool URL below.

   `import.meta.env.DEV` is true only under the dev server; every build
   (`vite build`, including `--mode qc`) is `PROD`, so qc and prod both fall
   through to the deployed URL. Set `VITE_CREATIVE_URL` in a `.env` file to
   override any environment (e.g. point qc at a separate deployment later). */

const DEV_TOOL_PORT = 5174;
const PROD_CREATIVE_URL = "https://juice-creativity--main-agentic-2uxjvhim.web.app";

function resolveCreativeUrl(): string {
  const override = import.meta.env.VITE_CREATIVE_URL;
  if (override) return override;

  if (import.meta.env.DEV) {
    return `${window.location.protocol}//${window.location.hostname}:${DEV_TOOL_PORT}`;
  }
  return PROD_CREATIVE_URL;
}

export const CREATIVE_URL = resolveCreativeUrl();
