# Acty — master "what's left for you" list

Everything that needs **your** action (accounts, DNS, dashboard config, decisions),
kept in one place so nothing is forgotten. Code for each item is already built and
committed unless noted. Project ref: `jklfdzrgambbntmbtgxe`.

Updated through: Phase 6 (LINE login).

---

## ✅ Phase 3 — Email (WORKING as of 2026-06-06)

Function deployed, secrets set, webhook live, tested end-to-end. One cosmetic step left:

- [ ] **Branded sender:** Resend → Domains → Add `mail.btechjapan.com` → add the
      SPF/DKIM records in Cloudflare DNS (paste them to me to double-check) → once
      **Verified**, change the `EMAIL_FROM` secret to `Acty <hello@mail.btechjapan.com>`.
      Until then mail sends from `onboarding@resend.dev` (delivers fine, just unbranded).

---

## 🟠 Phase 4 — Organizer dashboard (built & live)

The dashboard is at **`/organizer`**. To use it:

- [x] **Grant yourself the organizer role** — DONE 2026-06-06 (verified: role=organizer):
  ```sql
  update profiles set role = 'organizer'
  where id = (select id from auth.users where email = 'YOUR-EMAIL');
  ```
  Then reload `/organizer`.

**Resolved:** event detail is now a **runtime route** (`/event?slug=…`), so events you
create work instantly — no rebuild needed. (Trade-off: detail pages are client-rendered,
so they're not in static HTML for SEO. If event-page SEO matters, we can add a
self-hosted build runner later — just ask.)

---

## 🟢 Phase 5 — Membership (built & live)

Tiers (Free / Premium) + members-only event gating are built. A `/membership` page
shows the plans; members-only events show an upgrade prompt instead of the join button.
**Charging is not wired** (you chose free-only for now) — Premium shows "coming soon".

- [x] Run `supabase/migrations/0005_membership_demo.sql` — DONE 2026-06-06
      (サンライズヨガ is members-only).
- [x] Premium tier granted — DONE 2026-06-06 (verified: tier=premium).
- When you're ready to actually charge: pick a provider (see Phase 5 below) and I'll wire
  checkout + lock tier changes behind it.

---

## 🟣 Phase 6 — LINE login (built, needs your config)

Custom LINE bridge (LINE isn't a native Supabase provider). The green LINE button
is hidden until you set the channel ID. Full runbook: `supabase/functions/line-auth/README.md`.

- [ ] Create a **LINE Login channel** at developers.line.biz → note Channel ID + secret.
- [ ] Add callback URL `https://acty.btechjapan.com/auth/line` (+ localhost for dev).
- [ ] Add `NEXT_PUBLIC_LINE_CHANNEL_ID=<id>` to `.env.local` and tell me — I rebuild + redeploy.
- [ ] Deploy the `line-auth` Edge Function; set secrets `LINE_CHANNEL_ID`, `LINE_CHANNEL_SECRET`.
- [ ] Test: the **LINEで続ける** button on `/signin`.

*(Apple sign-in stays parked until you have an Apple Developer account.)*

---

## ✅ LINE notifications in the LINE app (WORKING as of 2026-06-07)

Messaging API channel + token configured, function redeployed, tested: join/cancel
sends a push message in the LINE app for LINE-login users. Email users keep getting
branded emails. (Free plan ≈ 200 pushes/month — watch usage as the community grows.)

## 🛡️ Phase 7 — Admin layer & dashboard (built, needs your SQL)

Three access levels are now real: **member → organizer → admin**. The admin
dashboard is at **`/admin`** (Overview KPIs + 30-day trends / Members with
role & premium management / all Events / Activity feed). To activate:

- [ ] Run `supabase/migrations/0006_admin.sql` in the SQL editor. This also
      **fixes a security hole** (users could previously change their own
      role/tier from the browser console), so run it even before using `/admin`.
- [ ] Make yourself admin (SQL editor):
  ```sql
  update profiles set role = 'admin'
  where id = (select id from auth.users where email = 'YOUR-EMAIL');
  ```
- [ ] Reload `/account` → an "管理ダッシュボード" card appears → open `/admin`.

Notes: admins can do everything organizers can (`/organizer` works too);
the last remaining admin can't be demoted; role/tier changes by non-admins
are blocked at the database level.

## 🖼️ Phase 8 — Cover image uploads (built, needs your SQL)

The organizer form now uploads cover images from disk (the URL-paste field is
gone; old events with URLs keep working). To activate:

- [ ] Run `supabase/migrations/0007_event_covers_storage.sql` in the SQL editor
      (creates the public `event-covers` bucket, 5MB / images only, organizer-only
      uploads). If the `create policy` lines error with "must be owner of table
      objects", create the same policies in Dashboard → Storage → Policies instead.
- [ ] Test: `/organizer` → edit an event → choose a file → preview appears → save.

## 📨 Inquiry mail (receive email at btechjapan.com) — free via Cloudflare

- [ ] Cloudflare → btechjapan.com → **Email → Email Routing** → enable (auto-adds MX).
- [ ] Add destination `saad.elmisery@gmail.com` → click the confirmation mail.
- [ ] Create custom addresses → `hello@btechjapan.com` (and `careers@…` if you like)
      → forward to your Gmail.
- [ ] Tell me the final address — I'll point all the site's contact links at it
      (replacing the placeholder `hello@acty.jp`) and set `REPLY_TO` on event emails
      so replies land in your inbox.

## ⚪ Earlier / optional

- [ ] **Google sign-in** (Phase 1, optional): Authentication → Providers → Google →
      enable with an OAuth client. Magic link already works without it.
- [ ] **Rotate the Cloudflare Tunnel token** — it was shared in chat earlier; safest to
      rotate it in the Zero Trust dashboard and update the `acty-tunnel` container.

---

## 🔵 Future phases (decisions when you're ready)

- **Phase 5 — Membership / payments:** pick a provider (Stripe, or JP-local PAY.JP /
  Komoju). Tiers/gating get built; charging waits on this choice.
- **Apple sign-in** — parked until you have an Apple Developer account ($99/yr); easy to add then.

## ✨ Enhancements (nice-to-have, just say the word)

- **Localize event content (JA/EN):** add `title_en` / `description_en` columns + English
  category names; the UI is already bilingual and will prefer them.
- **English legal pages:** terms / privacy / cookies are Japanese-only for now.
- ~~**Image uploads** for organizer events~~ — built (Phase 8 above).
