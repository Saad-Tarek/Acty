# Acty — master "what's left for you" list

Everything that needs **your** action (accounts, DNS, dashboard config, decisions),
kept in one place so nothing is forgotten. Code for each item is already built and
committed unless noted. Project ref: `jklfdzrgambbntmbtgxe`.

Updated through: Phase 5 (membership).

---

## 🔴 Phase 3 — Email (built, needs your config)

Full checklist: **`docs/PHASE3-EMAIL-CHECKLIST.md`**. Short version:

- [ ] Run `supabase/migrations/0004_email_log.sql` in the SQL editor.
- [ ] Resend account → add domain `mail.btechjapan.com` → add the SPF/DKIM records
      in Cloudflare DNS → wait for **Verified** → create an API key (`re_…`).
      *(You can paste me the DNS records to double-check — they aren't secret.)*
- [ ] Deploy the Edge Function `event-emails` (dashboard: paste
      `supabase/functions/event-emails/index.ts`).
- [ ] Set function secrets: `RESEND_API_KEY`, `EMAIL_FROM`, `SITE_URL`, `WEBHOOK_SECRET`.
- [ ] Create a Database Webhook on `participations` (Insert + Update) → the function.
- [ ] Test: join an event → confirmation email.

---

## 🟠 Phase 4 — Organizer dashboard (built & live)

The dashboard is at **`/organizer`**. To use it:

- [ ] **Grant yourself the organizer role** (one-time, SQL editor):
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

- [ ] Run `supabase/migrations/0005_membership_demo.sql` (marks サンライズヨガ as
      members-only so you can see the gating).
- [ ] To preview the premium experience, grant yourself the premium tier (SQL in that
      migration's comments), then reload — the members-only event becomes joinable.
- When you're ready to actually charge: pick a provider (see Phase 5 below) and I'll wire
  checkout + lock tier changes behind it.

---

## ⚪ Earlier / optional

- [ ] **Google sign-in** (Phase 1, optional): Authentication → Providers → Google →
      enable with an OAuth client. Magic link already works without it.
- [ ] **Rotate the Cloudflare Tunnel token** — it was shared in chat earlier; safest to
      rotate it in the Zero Trust dashboard and update the `acty-tunnel` container.

---

## 🔵 Future phases (decisions when you're ready)

- **Phase 5 — Membership / payments:** pick a provider (Stripe, or JP-local PAY.JP /
  Komoju). Tiers/gating get built; charging waits on this choice.
- **Phase 6 — LINE login:** create a LINE Developers channel (custom Edge Function flow).
  **Apple sign-in** was dropped (needs the $99/yr Apple Developer Program) — re-add anytime.

## ✨ Enhancements (nice-to-have, just say the word)

- **Localize event content (JA/EN):** add `title_en` / `description_en` columns + English
  category names; the UI is already bilingual and will prefer them.
- **English legal pages:** terms / privacy / cookies are Japanese-only for now.
- **Image uploads** for organizer events (Supabase Storage) instead of pasting an image URL.
