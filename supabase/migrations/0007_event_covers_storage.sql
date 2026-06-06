-- Acty — Phase 8: event cover image uploads (Supabase Storage).
-- Creates a public bucket `event-covers` and lets organizers/admins upload.
-- Run in the Supabase SQL editor. If the policy statements fail with
-- "must be owner of table objects", create the same policies via
-- Dashboard → Storage → Policies instead (same conditions).

-- Public bucket: anyone can view images via their public URL; uploads are
-- capped at 5 MB and restricted to common image types at the bucket level.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-covers',
  'event-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Helper condition: only organizers/admins may write, and only inside a
-- folder named after their own user id (so uploads are attributable).
create policy "event covers insert" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'event-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
    and exists (
      select 1 from profiles
      where id = auth.uid() and role in ('organizer', 'admin')
    )
  );

create policy "event covers update" on storage.objects for update to authenticated
  using (bucket_id = 'event-covers' and owner_id = auth.uid()::text)
  with check (bucket_id = 'event-covers' and owner_id = auth.uid()::text);

create policy "event covers delete" on storage.objects for delete to authenticated
  using (
    bucket_id = 'event-covers'
    and (owner_id = auth.uid()::text or is_admin())
  );
