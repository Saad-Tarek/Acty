# Acty backend (Supabase)

The static site talks directly to Supabase from the browser using the **anon**
key; **Row-Level Security** (defined in `migrations/0001_init.sql`) is what
protects the data. Server-only work (email, atomic admin tasks) runs in Edge
Functions. The nginx + Cloudflare Tunnel deploy of the static site is unchanged.

## One-time setup

1. **Create a project** at https://supabase.com (free tier is fine). Pick the
   Tokyo (`ap-northeast-1`) region.
2. **Run the schema.** Open the SQL Editor and paste the contents of
   `migrations/0001_init.sql`, or use the CLI:
   ```bash
   supabase link --project-ref <ref>
   supabase db push
   ```
3. **Copy your keys** from Project Settings → API into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   ```
   Both are safe to share / ship in the browser.

## Auth providers (Authentication → Providers)

| Provider   | What you need | Notes |
|------------|---------------|-------|
| Magic link | nothing       | Enable "Email"; we use OTP/magic-link, not passwords |
| Google     | OAuth client ID + secret (Google Cloud Console) | add the Supabase callback URL |
| Apple      | Apple Developer Program ($99/yr): Service ID, key, domain assoc. | |
| LINE       | LINE Developers channel | custom flow via Edge Function (built in Phase 6) |

Redirect URL to register with each provider:
`https://<ref>.supabase.co/auth/v1/callback`
Site URL (Authentication → URL Configuration): `https://acty.btechjapan.com`

## Data model (see migration for detail)

- `profiles` — 1:1 with `auth.users`, auto-created on signup; holds role + tier.
- `membership_tiers`, `categories` — reference data (seeded).
- `events` — organizer-owned; only `published` events are publicly readable.
- `participations` — unique per (event, user); written **only** through the
  `join_event()` / `cancel_participation()` functions so capacity and waitlist
  ordering stay atomic under concurrency.

## Next phases

- **Phase 1 — Auth:** browser client, `/auth/callback`, session provider, swap
  the password forms for magic-link + OAuth buttons.
- **Phase 2 — Participation:** events from the DB, join/cancel via RPC, waitlist,
  "My events".
- **Phase 3 — Email:** Resend + an Edge Function triggered by DB webhooks.
- **Phase 4–6:** organizer dashboard, membership gating, LINE login.
