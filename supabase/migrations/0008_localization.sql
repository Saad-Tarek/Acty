-- Acty — Phase 9: English content columns + translations.
-- Adds EN columns to categories/events, translates the seed data, and
-- rebuilds event_summaries to expose them. Run in the Supabase SQL editor.

-- ---------------------------------------------------------------------------
-- 1. Columns
-- ---------------------------------------------------------------------------
alter table categories add column if not exists name_en text;
alter table events
  add column if not exists title_en       text,
  add column if not exists description_en text,
  add column if not exists location_en    text;

-- ---------------------------------------------------------------------------
-- 2. Category translations
-- ---------------------------------------------------------------------------
update categories set name_en = 'Running'    where slug = 'running';
update categories set name_en = 'Yoga'       where slug = 'yoga';
update categories set name_en = 'Meditation' where slug = 'meditation';
update categories set name_en = 'Hiking'     where slug = 'hiking';

-- ---------------------------------------------------------------------------
-- 3. Seed-event translations
-- ---------------------------------------------------------------------------
update events set
  title_en = 'Morning Run Club',
  location_en = 'Yoyogi Park',
  description_en = 'As the morning sun begins to light up the city, we gather in the park and run a 5 km course, each at our own pace. Afterwards we stretch together and share what the morning brought us. More than half of the group are first-timers — it''s a calm, welcoming run. Whatever your pace, someone will always run alongside you.'
where slug = 'asa-no-run';

update events set
  title_en = 'Flow Time Yoga',
  location_en = 'Shibuya Studio',
  description_en = 'A flow-style yoga session that gently loosens the body, one breath at a time. Spend quiet time facing yourself in a calm studio. Mats are available to borrow, and beginners are very welcome.'
where slug = 'flow-time-yoga';

update events set
  title_en = 'Forest Walk Hike',
  location_en = 'Mt. Takao',
  description_en = 'Walk mountain trails at an easy pace while your breathing settles into the rhythm of the forest. The view from the top is something special. Meet new friends along the way and reset body and mind. Please bring comfortable clothes and something to drink.'
where slug = 'mori-wo-aruku-hiking';

update events set
  title_en = 'Sunset Meditation',
  location_en = 'Omotesando Studio',
  description_en = 'At the end of the day, take time to quietly bring your attention back to your breath. A guided meditation to gently let go of the day''s noise. Afterwards, we unwind together over a cup of warm tea.'
where slug = 'yugure-meditation';

update events set
  title_en = 'Weekend Long Run',
  location_en = 'Tama River Riverside',
  description_en = 'A running meet-up for anyone who wants to try a slightly longer distance. We follow a riverside course at a relaxed, conversational pace. Water stations are provided along the way.'
where slug = 'weekend-long-run';

update events set
  title_en = 'Sunrise Yoga',
  location_en = 'Odaiba Seaside Park',
  description_en = 'A small-group yoga session bathed in the morning sun. Wake body and mind at the very start of the day. A special session limited to a handful of participants.'
where slug = 'sunrise-yoga';

-- ---------------------------------------------------------------------------
-- 4. Rebuild the public summary view with the EN columns.
--    (drop + create because `create or replace` can't reorder/insert columns)
-- ---------------------------------------------------------------------------
drop view if exists public.event_summaries;

create view public.event_summaries as
select
  e.id,
  e.slug,
  e.title,
  e.title_en,
  e.description,
  e.description_en,
  e.cover_image,
  e.location,
  e.location_en,
  e.starts_at,
  e.ends_at,
  e.capacity,
  e.price,
  e.members_only,
  c.slug as category_slug,
  c.name as category_name,
  c.name_en as category_name_en,
  (select count(*) from participations p
     where p.event_id = e.id and p.status = 'confirmed') as confirmed_count,
  (select count(*) from participations p
     where p.event_id = e.id and p.status = 'waitlisted') as waitlist_count
from events e
left join categories c on c.id = e.category_id
where e.status = 'published';

grant select on public.event_summaries to anon, authenticated;
