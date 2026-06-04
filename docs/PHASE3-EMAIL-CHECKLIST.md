# Phase 3 — Email setup checklist

Transactional emails (confirm / waitlist / promotion / cancellation) via a
Supabase Edge Function + Resend. All the code is committed; this is the
remaining configuration. Full detail: `supabase/functions/event-emails/README.md`.

Project ref: `jklfdzrgambbntmbtgxe`

- [ ] **1. Run the idempotency migration**
  SQL Editor → paste `supabase/migrations/0004_email_log.sql` → Run.
  https://supabase.com/dashboard/project/jklfdzrgambbntmbtgxe/sql/new

- [ ] **2. Resend account + sending domain**
  - Sign up at https://resend.com
  - Domains → Add Domain → `mail.btechjapan.com` (recommended subdomain)
  - Add the SPF/DKIM records Resend shows you in Cloudflare → btechjapan.com → DNS
    (DKIM CNAMEs as "DNS only" / grey cloud) → wait for **Verified**
  - API Keys → Create → copy `re_…`
  - (You can paste me the DNS records to double-check — they're not secret.)

- [ ] **3. Deploy the function** (easiest via dashboard)
  Edge Functions → Create function → name `event-emails` → paste
  `supabase/functions/event-emails/index.ts` → Deploy.
  https://supabase.com/dashboard/project/jklfdzrgambbntmbtgxe/functions

- [ ] **4. Set the function secrets**
  | Key | Value |
  |-----|-------|
  | `RESEND_API_KEY` | your `re_…` key |
  | `EMAIL_FROM` | `Acty <hello@mail.btechjapan.com>` |
  | `SITE_URL` | `https://acty.btechjapan.com` |
  | `WEBHOOK_SECRET` | any random string |
  (`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.)

- [ ] **5. Create the Database Webhook**
  Database → Webhooks → Create → table `participations`, events **Insert + Update**,
  type **Supabase Edge Function → event-emails**, header `x-webhook-secret: <value>`.

- [ ] **6. Test**
  Sign in on the live site → join an event → confirmation email arrives in seconds.
  Check Edge Functions → Logs and the `email_log` table if anything's missing.

## Email triggers (reference)
| participation change | email |
|----------------------|-------|
| new `confirmed` | 参加確定 / Confirmed |
| new `waitlisted` | キャンセル待ち / Waitlisted |
| `waitlisted` → `confirmed` | 繰り上がり確定 / Promoted |
| any → `cancelled` | キャンセル確認 / Cancelled |
