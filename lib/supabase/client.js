import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once both the project URL and anon key are present in the build env. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Browser Supabase client. Pure static SPA, so we use the standard client with
 * PKCE + URL session detection (the /auth/callback route relies on this).
 * Null until configured, so importing it never throws during build.
 */
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  : null;
