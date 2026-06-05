// Acty — LINE Login bridge.
// The browser sends the LINE authorization `code`; this function exchanges it
// with LINE, verifies the identity, upserts a Supabase user, and returns a
// one-time magic-link token the browser uses to establish a session.
//
// Auto-provided env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// You must set: LINE_CHANNEL_ID, LINE_CHANNEL_SECRET.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  const CHANNEL_ID = Deno.env.get("LINE_CHANNEL_ID");
  const CHANNEL_SECRET = Deno.env.get("LINE_CHANNEL_SECRET");
  if (!CHANNEL_ID || !CHANNEL_SECRET) return json({ error: "not_configured" }, 500);

  let code: string, redirectUri: string;
  try {
    ({ code, redirectUri } = await req.json());
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!code || !redirectUri) return json({ error: "bad_request" }, 400);

  // 1. Exchange the authorization code for tokens.
  const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: CHANNEL_ID,
      client_secret: CHANNEL_SECRET,
    }),
  });
  if (!tokenRes.ok) return json({ error: "line_token", detail: await tokenRes.text() }, 400);
  const token = await tokenRes.json();
  if (!token.id_token) return json({ error: "no_id_token" }, 400);

  // 2. Verify the id_token and read the profile.
  const verifyRes = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ id_token: token.id_token, client_id: CHANNEL_ID }),
  });
  if (!verifyRes.ok) return json({ error: "line_verify" }, 400);
  const profile = await verifyRes.json();
  const sub = profile.sub;
  if (!sub) return json({ error: "no_sub" }, 400);

  const email = profile.email || `line_${sub}@line.users.acty`;
  const name = profile.name || null;
  const avatar = profile.picture || null;

  // 3. Upsert the Supabase user (idempotent).
  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error: createErr } = await supa.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { name, full_name: name, avatar_url: avatar, line_sub: sub },
  });
  // Ignore "already registered" — any other error is fatal.
  if (createErr && !/registered|exists/i.test(createErr.message)) {
    return json({ error: "create_user", detail: createErr.message }, 500);
  }

  // 4. Mint a one-time magic-link token for the browser to verify.
  const { data: link, error: linkErr } = await supa.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (linkErr) return json({ error: "generate_link", detail: linkErr.message }, 500);

  return json({ email, token_hash: link.properties.hashed_token });
});
