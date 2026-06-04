# Acty — master "what's left for you" list

Everything that needs **your** action (accounts, DNS, dashboard config, decisions),
kept in one place so nothing is forgotten. Code for each item is already built and
committed unless noted. Project ref: `jklfdzrgambbntmbtgxe`.

Updated through: Phase 4 (organizer dashboard).

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

**Known limitation (static-export):** an event you create shows up immediately in the
dashboard, the events list, and the roster — but its **public detail page**
(`/events/<slug>`) is generated at build time, so it appears after the next
deploy. Fix options for later: (a) I add a "rebuild on publish" webhook, or
(b) switch the event detail to a runtime route (`/event?slug=…`). Tell me which you
prefer and I'll wire it.

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
