# event-emails — Phase 3 setup

Sends branded confirmation / waitlist / promotion / cancellation emails when a
`participations` row changes. Triggered by a Supabase Database Webhook → Resend.

## 1. Run the migration

SQL Editor → paste `supabase/migrations/0004_email_log.sql` → Run. (Idempotency log.)

## 2. Resend account + sending domain

1. Create an account at https://resend.com.
2. **Domains → Add Domain.** Use a subdomain you control DNS for, e.g.
   `mail.btechjapan.com` (recommended — keeps sending reputation off the root
   and off the website host `acty.btechjapan.com`).
3. Resend shows DNS records (SPF `TXT`, DKIM `CNAME`s, optional DMARC). Add them
   in **Cloudflare → btechjapan.com → DNS** exactly as shown (set the DKIM CNAMEs
   to **DNS only**, grey cloud). Wait for Resend to mark the domain **Verified**.
4. **API Keys → Create** → copy the key (starts `re_…`). This is a secret.

Sender address after verification, e.g. `Acty <hello@mail.btechjapan.com>`.

> To test before DNS is ready: Resend's `onboarding@resend.dev` works but only
> delivers to the email you signed up with. Fine for a first smoke test.

## 3. Deploy the function

**Option A — Dashboard (no CLI):** Edge Functions → Create a function named
`event-emails` → paste the contents of `index.ts` → Deploy.

**Option B — CLI:**
```bash
supabase login                       # needs a personal access token
supabase link --project-ref jklfdzrgambbntmbtgxe
supabase functions deploy event-emails --no-verify-jwt
```
(`--no-verify-jwt`: the DB webhook calls it without a user JWT; it's secured by
the optional `WEBHOOK_SECRET` header below.)

## 4. Set the secrets

Edge Functions → event-emails → **Secrets** (or `supabase secrets set …`):

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | your `re_…` key |
| `EMAIL_FROM` | `Acty <hello@mail.btechjapan.com>` |
| `SITE_URL` | `https://acty.btechjapan.com` |
| `WEBHOOK_SECRET` | any random string (optional but recommended) |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically — don't set them.

## 5. Create the Database Webhook

Database → **Webhooks** → Create:
- Table: `participations`, schema `public`
- Events: **Insert** and **Update**
- Type: **Supabase Edge Function** → `event-emails`
- If you set `WEBHOOK_SECRET`, add an HTTP header `x-webhook-secret: <same value>`.

## 6. Test

Sign in on the live site, join an event → you should receive the confirmation
email within a few seconds. Cancel → cancellation email. Check
**Edge Functions → Logs** and the `email_log` table if anything's missing.

Emails sent (by participation transition):
- new `confirmed` → **参加確定**
- new `waitlisted` → **キャンセル待ち登録**
- `waitlisted` → `confirmed` → **繰り上がり確定**
- any → `cancelled` → **キャンセル確認**
