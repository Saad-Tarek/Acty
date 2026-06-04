-- Acty — Phase 2: official events, profile self-heal, summary view, seed data.
-- Run after 0001 (SQL Editor → paste → Run).

-- Allow platform-curated events that have no organizer profile yet.
alter table events alter column organizer_id drop not null;

-- Let a signed-in user create their own profile row (self-heal if the signup
-- trigger didn't run, e.g. accounts created before the trigger existed).
create policy profiles_insert_own on profiles
  for insert with check (id = auth.uid());

-- Public, read-only summary of published events with a live confirmed-seat count.
-- (View runs with owner rights so the count isn't blocked by participation RLS;
--  it only ever exposes published events + an aggregate number — all public.)
create or replace view public.event_summaries as
select
  e.id,
  e.slug,
  e.title,
  e.description,
  e.cover_image,
  e.location,
  e.starts_at,
  e.ends_at,
  e.capacity,
  e.price,
  e.members_only,
  c.slug as category_slug,
  c.name as category_name,
  (select count(*) from participations p
     where p.event_id = e.id and p.status = 'confirmed') as confirmed_count,
  (select count(*) from participations p
     where p.event_id = e.id and p.status = 'waitlisted') as waitlist_count
from events e
left join categories c on c.id = e.category_id
where e.status = 'published';

grant select on public.event_summaries to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Seed events (organizer-less / official). Dates are relative to now().
-- ---------------------------------------------------------------------------
insert into events (slug, category_id, title, description, cover_image, location, starts_at, ends_at, capacity, price, members_only, status)
values
  ('asa-no-run',
   (select id from categories where slug = 'running'),
   '朝のラン会',
   E'朝日が街を照らしはじめる時間、公園に集まってそれぞれのペースで5キロを走ります。走り終えたあとは、みんなでストレッチをしながらその日の気づきを分かち合います。はじめての方が半数以上の、おだやかな会です。ペースが合わなくても、誰かが必ず一緒に走ります。',
   'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=1200',
   '代々木公園', now() + interval '5 days', now() + interval '5 days' + interval '90 minutes', 12, 0, false, 'published'),

  ('flow-time-yoga',
   (select id from categories where slug = 'yoga'),
   'フロータイムヨガ',
   E'呼吸とともに、ゆっくりと体をほぐしていくフロースタイルのヨガです。静かなスタジオで自分と向き合う時間を過ごしましょう。マットの貸し出しもあります。初心者の方も安心してご参加ください。',
   'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200',
   '渋谷スタジオ', now() + interval '8 days', now() + interval '8 days' + interval '75 minutes', 8, 0, false, 'published'),

  ('mori-wo-aruku-hiking',
   (select id from categories where slug = 'hiking'),
   '森を歩くハイキング',
   E'自然の中で呼吸を整えながら、ゆっくりと山道を歩きます。頂上で見える景色は格別です。歩きながら新しい仲間と出会い、体と心をリセットしましょう。動きやすい服装と飲み物をご用意ください。',
   'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200',
   '高尾山', now() + interval '12 days', now() + interval '12 days' + interval '4 hours', 20, 0, false, 'published'),

  ('yugure-meditation',
   (select id from categories where slug = 'meditation'),
   '夕暮れの瞑想',
   E'一日の終わりに、静かに呼吸へ意識を向ける時間。ガイドつきの瞑想で、心のざわめきをそっと手放していきます。終わったあとは、温かいお茶を飲みながらゆっくり過ごします。',
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
   '表参道スタジオ', now() + interval '6 days', now() + interval '6 days' + interval '60 minutes', 15, 0, false, 'published'),

  ('weekend-long-run',
   (select id from categories where slug = 'running'),
   '週末ロングラン',
   E'少し長めの距離に挑戦したい人のためのランニング会です。川沿いのコースを、おしゃべりしながら無理のないペースで走ります。給水ポイントもご用意しています。',
   'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200',
   '多摩川河川敷', now() + interval '15 days', now() + interval '15 days' + interval '2 hours', 10, 0, false, 'published'),

  ('sunrise-yoga',
   (select id from categories where slug = 'yoga'),
   'サンライズヨガ',
   E'朝日を浴びながら行う、少人数のヨガセッション。一日のはじまりに心と体を目覚めさせます。人数を絞った特別な会です。',
   'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200',
   'お台場海浜公園', now() + interval '4 days', now() + interval '4 days' + interval '60 minutes', 6, 0, false, 'published')
on conflict (slug) do nothing;
