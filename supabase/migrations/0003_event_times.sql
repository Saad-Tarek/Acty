-- Acty — give the seeded events sensible local (JST) times instead of "now + N days".
-- Safe to run once after 0002.

update events set
  starts_at = ((current_date + 4) + time '06:00') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 4) + time '07:00') at time zone 'Asia/Tokyo'
where slug = 'sunrise-yoga';

update events set
  starts_at = ((current_date + 5) + time '06:30') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 5) + time '08:00') at time zone 'Asia/Tokyo'
where slug = 'asa-no-run';

update events set
  starts_at = ((current_date + 6) + time '18:00') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 6) + time '19:00') at time zone 'Asia/Tokyo'
where slug = 'yugure-meditation';

update events set
  starts_at = ((current_date + 8) + time '19:00') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 8) + time '20:15') at time zone 'Asia/Tokyo'
where slug = 'flow-time-yoga';

update events set
  starts_at = ((current_date + 12) + time '09:00') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 12) + time '13:00') at time zone 'Asia/Tokyo'
where slug = 'mori-wo-aruku-hiking';

update events set
  starts_at = ((current_date + 15) + time '07:00') at time zone 'Asia/Tokyo',
  ends_at   = ((current_date + 15) + time '09:00') at time zone 'Asia/Tokyo'
where slug = 'weekend-long-run';
