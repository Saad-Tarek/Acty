-- Acty — Phase 3: email idempotency log.
-- The Edge Function records each email it sends so webhook double-fires don't
-- produce duplicate mail. Only the service role (used by the function) touches
-- this table; RLS is on with no policies, so anon/authenticated can't read it.

create table email_log (
  id               uuid primary key default gen_random_uuid(),
  participation_id uuid references participations (id) on delete cascade,
  kind             text not null,        -- confirmed | waitlisted | promoted | cancelled
  recipient        text,
  ok               boolean,
  created_at       timestamptz not null default now(),
  unique (participation_id, kind)
);

alter table email_log enable row level security;
