import { supabase } from "@/lib/supabase/client";

/** The current user's membership tier slug ("free" | "premium"), or null if signed out. */
export async function getMyTierSlug() {
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("tier:membership_tiers(slug)")
    .eq("id", auth.user.id)
    .maybeSingle();
  return data?.tier?.slug || "free";
}
