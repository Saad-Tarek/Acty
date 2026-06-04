-- Acty — initial schema, RLS, and participation logic.
-- Run in the Supabase SQL editor (or `supabase db push`) once a project exists.
-- Design notes:
--  * Profiles mirror auth.users (created automatically on signup).
--  * Event joins/cancellations go through SECURITY DEFINER functions so capacity
--    and waitlist ordering stay atomic; direct writes to `participations` are
--    blocked by RLS (no INSERT/UPDATE policy for normal users).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type user_role          as enum ('member', 'organizer', 'admin');
create type event_status       as enum ('draft', 'published', 'cancelled');
create type participation_status as enum ('confirmed', 'waitlisted', 'cancelled');

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;

-- ---------------------------------------------------------------------------
-- Membership tiers
-- ---------------------------------------------------------------------------
create table membership_tiers (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  price_monthly integer,                 -- in JPY; null = free
  perks         jsonb not null default '[]'::jsonb,
  sort_order    integer not null default 0
);

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
create table categories (
  id    uuid primary key default gen_random_uuid(),
  slug  text unique not null,
  name  text not null,
  icon  text
);

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url   text,
  bio          text,
  role         user_role not null default 'member',
  tier_id      uuid references membership_tiers (id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create trigger profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

-- Create a profile row whenever a new auth user is created.
create or replace function handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end; $$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table events (
  id           uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references profiles (id) on delete restrict,
  category_id  uuid references categories (id),
  slug         text unique not null,
  title        text not null,
  description  text,
  cover_image  text,
  location     text,
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  capacity     integer,                 -- null = unlimited
  price        integer not null default 0,
  members_only boolean not null default false,
  status       event_status not null default 'draft',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index events_status_starts_idx on events (status, starts_at);
create index events_organizer_idx on events (organizer_id);
create trigger events_updated_at before update on events
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Participations
-- ---------------------------------------------------------------------------
create table participations (
  id           uuid primary key default gen_random_uuid(),
  event_id     uuid not null references events (id) on delete cascade,
  user_id      uuid not null references profiles (id) on delete cascade,
  status       participation_status not null,
  waitlist_pos integer,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (event_id, user_id)
);
create index participations_event_idx on participations (event_id, status);
create index participations_user_idx on participations (user_id, status);
create trigger participations_updated_at before update on participations
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Atomic join: confirm if a seat is free, otherwise waitlist.
-- ---------------------------------------------------------------------------
create or replace function join_event(p_event_id uuid)
returns participation_status as $$
declare
  v_user      uuid := auth.uid();
  v_cap       integer;
  v_confirmed integer;
  v_existing  participation_status;
  v_status    participation_status;
  v_pos       integer;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;

  -- Serialize concurrent joins on the same event by locking its row.
  select capacity into v_cap
  from events
  where id = p_event_id and status = 'published'
  for update;

  if not found then
    raise exception 'event not available';
  end if;

  select status into v_existing
  from participations
  where event_id = p_event_id and user_id = v_user;

  if v_existing in ('confirmed', 'waitlisted') then
    return v_existing;     -- already in
  end if;

  select count(*) into v_confirmed
  from participations
  where event_id = p_event_id and status = 'confirmed';

  if v_cap is null or v_confirmed < v_cap then
    v_status := 'confirmed';
    v_pos := null;
  else
    v_status := 'waitlisted';
    select coalesce(max(waitlist_pos), 0) + 1 into v_pos
    from participations
    where event_id = p_event_id and status = 'waitlisted';
  end if;

  insert into participations (event_id, user_id, status, waitlist_pos)
  values (p_event_id, v_user, v_status, v_pos)
  on conflict (event_id, user_id)
  do update set status = excluded.status, waitlist_pos = excluded.waitlist_pos, updated_at = now();

  return v_status;
end; $$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- Cancel + promote the head of the waitlist when a confirmed seat frees up.
-- ---------------------------------------------------------------------------
create or replace function cancel_participation(p_event_id uuid)
returns void as $$
declare
  v_user      uuid := auth.uid();
  v_was       participation_status;
  v_cap       integer;
  v_confirmed integer;
  v_next      uuid;
begin
  if v_user is null then
    raise exception 'authentication required';
  end if;

  select capacity into v_cap from events where id = p_event_id for update;

  select status into v_was
  from participations
  where event_id = p_event_id and user_id = v_user;

  if v_was is null or v_was = 'cancelled' then
    return;
  end if;

  update participations
  set status = 'cancelled', waitlist_pos = null, updated_at = now()
  where event_id = p_event_id and user_id = v_user;

  if v_was = 'confirmed' then
    select count(*) into v_confirmed
    from participations
    where event_id = p_event_id and status = 'confirmed';

    if v_cap is null or v_confirmed < v_cap then
      select user_id into v_next
      from participations
      where event_id = p_event_id and status = 'waitlisted'
      order by waitlist_pos asc
      limit 1;

      if v_next is not null then
        update participations
        set status = 'confirmed', waitlist_pos = null, updated_at = now()
        where event_id = p_event_id and user_id = v_next;
      end if;
    end if;
  end if;
end; $$ language plpgsql security definer;

grant execute on function join_event(uuid) to authenticated;
grant execute on function cancel_participation(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------
alter table membership_tiers enable row level security;
alter table categories       enable row level security;
alter table profiles         enable row level security;
alter table events           enable row level security;
alter table participations   enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql stable security definer;

-- Reference data: world-readable, admin-writable.
create policy tiers_read    on membership_tiers for select using (true);
create policy tiers_admin   on membership_tiers for all using (is_admin()) with check (is_admin());
create policy cats_read     on categories       for select using (true);
create policy cats_admin    on categories       for all using (is_admin()) with check (is_admin());

-- Profiles: readable by all (public display); each user edits only their own.
create policy profiles_read       on profiles for select using (true);
create policy profiles_update_own on profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Events: published are public; organizers manage their own; admins manage all.
create policy events_read on events for select
  using (status = 'published' or organizer_id = auth.uid() or is_admin());
create policy events_insert on events for insert
  with check (organizer_id = auth.uid() or is_admin());
create policy events_update on events for update
  using (organizer_id = auth.uid() or is_admin())
  with check (organizer_id = auth.uid() or is_admin());
create policy events_delete on events for delete
  using (organizer_id = auth.uid() or is_admin());

-- Participations: visible to the participant, the event's organizer, and admins.
-- Writes happen only through join_event() / cancel_participation() (no write policy).
create policy participations_read on participations for select using (
  user_id = auth.uid()
  or is_admin()
  or exists (select 1 from events e where e.id = event_id and e.organizer_id = auth.uid())
);

-- ---------------------------------------------------------------------------
-- Seed reference data
-- ---------------------------------------------------------------------------
insert into categories (slug, name, icon) values
  ('running',    'ランニング', 'directions_run'),
  ('yoga',       'ヨガ',       'self_improvement'),
  ('meditation', '瞑想',       'mindfulness'),
  ('hiking',     'ハイキング', 'hiking')
on conflict (slug) do nothing;

insert into membership_tiers (slug, name, price_monthly, sort_order, perks) values
  ('free',    'フリー',     null, 0, '["イベント情報の閲覧", "イベントへの参加"]'::jsonb),
  ('premium', 'プレミアム', 1980, 1, '["限定イベントへの参加", "優先予約", "メンバー限定コミュニティ"]'::jsonb)
on conflict (slug) do nothing;
