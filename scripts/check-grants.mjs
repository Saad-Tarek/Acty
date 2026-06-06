// Verifies the Case-1 SQL grants (no key printed).
import { readFile } from "node:fs/promises";

const env = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) =>
  (env.split(/\r?\n/).find((l) => l.startsWith(k + "=")) || "").slice(k.length + 1).trim();
const url = get("NEXT_PUBLIC_SUPABASE_URL");
const key = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const headers = { apikey: key, Authorization: `Bearer ${key}` };

const ev = await (
  await fetch(`${url}/rest/v1/event_summaries?slug=eq.sunrise-yoga&select=slug,members_only`, { headers })
).json();
console.log("sunrise-yoga members_only:", ev[0]?.members_only);

const profiles = await (
  await fetch(`${url}/rest/v1/profiles?select=role,tier:membership_tiers(slug)`, { headers })
).json();
for (const p of profiles) {
  console.log(`profile: role=${p.role}, tier=${p.tier?.slug ?? "free"}`);
}
