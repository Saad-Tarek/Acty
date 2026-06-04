-- Acty — Phase 5: membership demo helpers. Safe to run once.

-- Mark one seeded event as members-only so the gating is visible on the site.
update events set members_only = true where slug = 'sunrise-yoga';

-- To test the premium experience, grant yourself the premium tier (replace email):
--   update profiles set tier_id = (select id from membership_tiers where slug = 'premium')
--   where id = (select id from auth.users where email = 'YOUR-EMAIL');
--
-- Back to free:
--   update profiles set tier_id = null
--   where id = (select id from auth.users where email = 'YOUR-EMAIL');
