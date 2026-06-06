import { supabase } from "@/lib/supabase/client";

export const COVER_BUCKET = "event-covers";
export const MAX_COVER_BYTES = 5 * 1024 * 1024; // matches the bucket limit
export const ALLOWED_COVER_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * Upload an event cover image to Storage and return its public URL.
 * Files land in a folder named after the uploader's user id (required by
 * the bucket's RLS policy). Validate type/size before calling.
 */
export async function uploadEventCover(file) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error("authentication required");

  const path = `${auth.user.id}/${crypto.randomUUID()}.${EXT[file.type] || "jpg"}`;
  const { error } = await supabase.storage
    .from(COVER_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(COVER_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
