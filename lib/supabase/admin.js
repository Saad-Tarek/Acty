import { supabase } from "@/lib/supabase/client";

/**
 * Admin data access. Every RPC here re-checks `is_admin()` server-side
 * (RLS / SECURITY DEFINER), so these calls fail for non-admins regardless
 * of what the client does.
 */

/** Platform-wide stats (counts, 30-day trends, top events). */
export async function getAdminStats() {
  const { data, error } = await supabase.rpc("admin_stats");
  if (error) throw error;
  return data;
}

/** All users with email, role, tier, join date, events joined. */
export async function listAllUsers() {
  const { data, error } = await supabase.rpc("admin_list_users");
  if (error) throw error;
  return data ?? [];
}

/** Change a user's role: "member" | "organizer" | "admin". */
export async function setUserRole(userId, role) {
  const { error } = await supabase.rpc("admin_set_role", {
    p_user: userId,
    p_role: role,
  });
  if (error) throw error;
}

/** Change a user's tier by slug ("free" | "premium" | null). */
export async function setUserTier(userId, tierSlug) {
  const { error } = await supabase.rpc("admin_set_tier", {
    p_user: userId,
    p_tier_slug: tierSlug,
  });
  if (error) throw error;
}

/** Every event on the platform, any status, with its organizer's name. */
export async function listAllEvents() {
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, slug, title, status, starts_at, location, capacity, members_only, organizer:profiles(display_name)",
    )
    .order("starts_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Latest join / waitlist / cancel movements across all events. */
export async function listRecentActivity(limit = 30) {
  const { data, error } = await supabase
    .from("participations")
    .select(
      "status, waitlist_pos, created_at, updated_at, user:profiles(display_name), event:events(title, slug)",
    )
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
