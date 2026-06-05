# line-auth — Phase 6 LINE Login setup

LINE isn't a built-in Supabase provider, so sign-in uses a custom bridge:
the browser does the LINE OAuth redirect → `/auth/line` sends the `code` to this
Edge Function → the function exchanges it with LINE, upserts a Supabase user, and
returns a one-time magic-link token the browser verifies to get a session.

## 1. Create a LINE Login channel

1. https://developers.line.biz/console/ → create a Provider → **Create a LINE Login channel**.
2. Note the **Channel ID** and **Channel secret**.
3. LINE Login settings → **Callback URL**: add
   `https://acty.btechjapan.com/auth/line` (and `http://localhost:3000/auth/line` for local).
4. Scopes: `profile`, `openid` (email is optional and needs LINE's email-permission review;
   the code falls back to a synthesized address if email isn't provided).

## 2. Frontend env

Add to `.env.local`, then I rebuild + redeploy:
```
NEXT_PUBLIC_LINE_CHANNEL_ID=<your channel id>
```
(The LINE button is hidden until this is set.)

## 3. Deploy the function

Edge Functions → Create function `line-auth` → paste
`supabase/functions/line-auth/index.ts` → Deploy. (CLI: `supabase functions deploy line-auth --no-verify-jwt`.)

## 4. Function secrets

| Key | Value |
|-----|-------|
| `LINE_CHANNEL_ID` | same as the public channel ID |
| `LINE_CHANNEL_SECRET` | the channel secret (server only) |

(`SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.)

## 5. Test

On `/signin`, the green **LINEで続ける** button appears → it redirects to LINE →
back to `/auth/line` → you land signed in on `/account`.

Notes:
- LINE-only users get a synthesized email (`line_<sub>@line.users.acty`); if a user
  also signs in with a real email, that's a separate account (fine for now).
- Errors surface on `/auth/line`; check Edge Function logs for detail.
