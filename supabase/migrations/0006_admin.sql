-- Acty — Phase 7: admin layer.
-- The `admin` role, is_admin(), and admin RLS bypasses already exist (0001).
-- This migration adds what was missing to actually operate as an admin:
--   1. A guard so non-admins can't change role / tier_id on their own profile
--      (the profiles_update_own policy allows ALL columns — escalation hole).
--   2. Admin RPCs: user list (with emails), platform stats, set role / tier.
--   3. Admins may read the notification log (email_log).
-- Run in the Supabase SQL editor.

-- ---------------------------------------------------------------------------
-- 1. Privilege-escalation guard.
--    auth.uid() is null for the SQL editor / service role, so manual SQL and
--    Edge Functions keep working; browser sessions need the admin role.
-- ---------------------------------------------------------------------------
create or replace function protect_profile_columns() returns trigger as $$
begin
  if (new.role is distinct from old.role
      or new.tier_id is distinct from old.tier_id)
     and auth.uid() is not null
     and not is_admin() then
    raise exception 'only admins can change role or tier';
  end if;
  return new;
end; $$ language plpgsql security definer;

drop trigger if exists profiles_protect_columns on profiles;
create trigger profiles_protect_columns before update on profiles
  for each row execute function protect_profile_columns();

-- ---------------------------------------------------------------------------
-- 2a. Change a user's role. Refuses to demote the last remaining admin.
-- ---------------------------------------------------------------------------
create or replace function admin_set_role(p_user uuid, p_role user_role)
returns void as $$
begin
  if not is_admin() then
    raise exception 'admin only';
  end if;

  if p_role <> 'admin'
     and exists (select 1 from profiles where id = p_user and role = 'admin')
     and (select count(*) from profiles where role = 'admin') <= 1 then
    raise exception 'cannot demote the last admin';
  end if;

  update profiles set role = p_role where id = p_user;
end; $$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- 2b. Change a user's membership tier (by slug; null = no tier / free).
-- ---------------------------------------------------------------------------
create or replace function admin_set_tier(p_user uuid, p_tier_slug text)
returns void as $$
declare
  v_tier uuid;
begin
  if not is_admin() then
    raise exception 'admin only';
  end if;

  if p_tier_slug is not null then
    select id into v_tier from membership_tiers where slug = p_tier_slug;
    if not found then
      raise exception 'unknown tier %', p_tier_slug;
    end if;
  end if;

  update profiles set tier_id = v_tier where id = p_user;
end; $$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- 2c. Full user list with emails (auth.users is only reachable via
--     SECURITY DEFINER — browsers can never query it directly).
-- ---------------------------------------------------------------------------
create or replace function admin_list_users()
returns table (
  id            uuid,
  email         text,
  display_name  text,
  role          user_role,
  tier          text,
  created_at    timestamptz,
  events_joined bigint
) as $$
begin
  if not is_admin() then
    raise exception 'admin only';
  end if;

  return query
  select p.id,
         u.email::text,
         p.display_name,
         p.role,
         t.slug,
         p.created_at,
         (select count(*) from participations pa
           where pa.user_id = p.id and pa.status in ('confirmed', 'waitlisted'))
  from profiles p
  join auth.users u on u.id = p.id
  left join membership_tiers t on t.id = p.tier_id
  order by p.created_at desc;
end; $$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- 2d. Platform stats in one round trip.
-- ---------------------------------------------------------------------------
create or replace function admin_stats()
returns jsonb as $$
declare
  result jsonb;
begin
  if not is_admin() then
    raise exception 'admin only';
  end if;

  select jsonb_build_object(
    'users',      (select count(*) from profiles),
    'organizers', (select count(*) from profiles where role = 'organizer'),
    'admins',     (select count(*) from profiles where role = 'admin'),
    'premium',    (select count(*) from profiles p
                     join membership_tiers t on t.id = p.tier_id
                    where t.slug = 'premium'),
    'events', jsonb_build_object(
      'published', (select count(*) from events where status = 'published'),
      'draft',     (select count(*) from events where status = 'draft'),
      'cancelled', (select count(*) from events where status = 'cancelled'),
      'upcoming',  (select count(*) from events
                     where status = 'published' and starts_at > now())
    ),
    'participations', jsonb_build_object(
      'confirmed',  (select count(*) from participations where status = 'confirmed'),
      'waitlisted', (select count(*) from participations where status = 'waitlisted'),
      'cancelled',  (select count(*) from participations where status = 'cancelled')
    ),
    'notifications', jsonb_build_object(
      'sent',   (select count(*) from email_log where ok),
      'failed', (select count(*) from email_log where ok is not true)
    ),
    'signups_30d', (
      select coalesce(
        jsonb_agg(jsonb_build_object('d', d.day::date, 'n', coalesce(c.n, 0))
                  order by d.day), '[]'::jsonb)
      from generate_series(current_date - 29, current_date, interval '1 day') as d(day)
      left join (
        select created_at::date as day, count(*) as n
        from profiles
        where created_at >= current_date - 29
        group by 1
      ) c on c.day = d.day::date
    ),
    'joins_30d', (
      select coalesce(
        jsonb_agg(jsonb_build_object('d', d.day::date, 'n', coalesce(c.n, 0))
                  order by d.day), '[]'::jsonb)
      from generate_series(current_date - 29, current_date, interval '1 day') as d(day)
      left join (
        select created_at::date as day, count(*) as n
        from participations
        where created_at >= current_date - 29
        group by 1
      ) c on c.day = d.day::date
    ),
    'top_events', (
      select coalesce(jsonb_agg(x), '[]'::jsonb)
      from (
        select e.title,
               e.slug,
               e.capacity,
               count(*) filter (where pa.status = 'confirmed')  as confirmed,
               count(*) filter (where pa.status = 'waitlisted') as waitlisted
        from events e
        join participations pa on pa.event_id = e.id
        group by e.id
        order by confirmed desc, waitlisted desc
        limit 5
      ) x
    )
  ) into result;

  return result;
end; $$ language plpgsql security definer;

-- Browsers call these as signed-in users; the is_admin() check inside each
-- function is the real gate. Keep anon out entirely.
grant execute on function admin_set_role(uuid, user_role)  to authenticated;
grant execute on function admin_set_tier(uuid, text)       to authenticated;
grant execute on function admin_list_users()               to authenticated;
grant execute on function admin_stats()                    to authenticated;
revoke execute on function admin_set_role(uuid, user_role) from anon;
revoke execute on function admin_set_tier(uuid, text)      from anon;
revoke execute on function admin_list_users()              from anon;
revoke execute on function admin_stats()                   from anon;

-- ---------------------------------------------------------------------------
-- 3. Admins can audit the notification log.
-- ---------------------------------------------------------------------------
drop policy if exists email_log_admin_read on email_log;
create policy email_log_admin_read on email_log for select using (is_admin());
