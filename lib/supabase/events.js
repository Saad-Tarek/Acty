import { supabase } from "@/lib/supabase/client";

/** All published events, soonest first, with live seat counts. */
export async function listEvents() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("event_summaries")
    .select("*")
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

/** A single published event by slug (or null). */
export async function getEvent(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("event_summaries")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

/** The current user's participation status for an event ("confirmed" | "waitlisted" | "cancelled" | null). */
export async function getMyParticipation(eventId) {
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return null;
  const { data, error } = await supabase
    .from("participations")
    .select("status, waitlist_pos")
    .eq("event_id", eventId)
    .eq("user_id", auth.user.id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

/** Join an event atomically; returns "confirmed" | "waitlisted". */
export async function joinEvent(eventId) {
  const { data, error } = await supabase.rpc("join_event", { p_event_id: eventId });
  if (error) throw error;
  return data;
}

/** Cancel the current user's participation (promotes the waitlist head if a seat frees). */
export async function cancelParticipation(eventId) {
  const { error } = await supabase.rpc("cancel_participation", { p_event_id: eventId });
  if (error) throw error;
}

/** The current user's upcoming participations with the event attached. */
export async function listMyEvents() {
  if (!supabase) return [];
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return [];
  const { data, error } = await supabase
    .from("participations")
    .select(
      "status, waitlist_pos, event:events(slug, title, title_en, starts_at, location, location_en, cover_image)",
    )
    .eq("user_id", auth.user.id)
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).filter((p) => p.event);
}

/**
 * Make sure the signed-in user has a profile row. Safe to call repeatedly;
 * relies on the profiles_insert_own policy and the unique PK.
 */
export async function ensureProfile(user) {
  if (!supabase || !user) return;
  const name =
    user.user_metadata?.name || user.user_metadata?.full_name || null;
  const avatar = user.user_metadata?.avatar_url || null;
  await supabase
    .from("profiles")
    .upsert(
      { id: user.id, display_name: name, avatar_url: avatar },
      { onConflict: "id", ignoreDuplicates: true },
    );
}
