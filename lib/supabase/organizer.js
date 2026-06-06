import { supabase } from "@/lib/supabase/client";

/** The current user's profile (id, display_name, role) or null. */
export async function getMyProfile() {
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, display_name, role")
    .eq("id", auth.user.id)
    .maybeSingle();
  return data ?? null;
}

export async function listCategories() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, name_en")
    .order("name");
  return data ?? [];
}

/** All events owned by the current user, any status. */
export async function listMyOrganizedEvents() {
  if (!supabase) return [];
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return [];
  const { data, error } = await supabase
    .from("events")
    .select(
      "id, slug, title, title_en, description, description_en, status, starts_at, ends_at, location, location_en, capacity, price, members_only, category_id, cover_image",
    )
    .eq("organizer_id", auth.user.id)
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createEvent(input) {
  const { data: auth } = await supabase.auth.getUser();
  const slug = (input.slug || "").trim() || `ev-${crypto.randomUUID().slice(0, 8)}`;
  const { data, error } = await supabase
    .from("events")
    .insert({ ...toRow(input), organizer_id: auth.user.id, slug })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEvent(id, input) {
  const { error } = await supabase.from("events").update(toRow(input)).eq("id", id);
  if (error) throw error;
}

export async function setEventStatus(id, status) {
  const { error } = await supabase.from("events").update({ status }).eq("id", id);
  if (error) throw error;
}

function toRow(input) {
  return {
    title: input.title,
    title_en: input.title_en?.trim() || null,
    description: input.description || null,
    description_en: input.description_en?.trim() || null,
    location_en: input.location_en?.trim() || null,
    category_id: input.category_id || null,
    cover_image: input.cover_image || null,
    location: input.location || null,
    starts_at: input.starts_at,
    ends_at: input.ends_at || null,
    capacity:
      input.capacity === "" || input.capacity == null
        ? null
        : Number(input.capacity),
    price: input.price ? Number(input.price) : 0,
    members_only: !!input.members_only,
    status: input.status || "draft",
  };
}

/** Confirmed + waitlisted participants for an organizer's event (names only). */
export async function getRoster(eventId) {
  const { data, error } = await supabase
    .from("participations")
    .select("status, waitlist_pos, created_at, user:profiles(display_name)")
    .eq("event_id", eventId)
    .neq("status", "cancelled")
    .order("status")
    .order("waitlist_pos", { nullsFirst: true });
  if (error) throw error;
  return data ?? [];
}
