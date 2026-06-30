import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Surface a clear message during dev / build if the env isn't configured.
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — set them in .env (local) or your deploy env.",
  );
}

/* Public anon client. All sensitive access (redeeming codes, listing leads) goes
   through SECURITY DEFINER RPCs, so the anon key never grants direct table access. */
export const supabase = createClient(url ?? "", anonKey ?? "", {
  auth: { persistSession: false },
});
