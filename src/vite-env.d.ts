/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Override for the campaign tool URL; see src/app/lib/config.ts. */
  readonly VITE_CREATIVE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
