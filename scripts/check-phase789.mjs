// Verify migrations 0006 (admin), 0007 (storage bucket), 0008 (EN columns)
// using only the public anon key. Prints results, never secrets.
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);
const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

// 0008 — EN columns visible through the view?
const r1 = await fetch(
  `${URL}/rest/v1/event_summaries?select=slug,title_en,category_name_en&order=slug&limit=6`,
  { headers: H },
);
const rows = await r1.json();
if (!r1.ok) {
  console.log(`0008 view: FAIL (${r1.status}) ${JSON.stringify(rows).slice(0, 120)}`);
} else {
  const translated = rows.filter((r) => r.title_en).length;
  console.log(`0008 view: OK — ${rows.length} events, ${translated} with title_en`);
  for (const r of rows) console.log(`   ${r.slug} → ${r.title_en ?? "(none)"} [${r.category_name_en ?? "-"}]`);
}

// 0006 — admin function exists (anon call must be rejected, NOT "not found")
const r2 = await fetch(`${URL}/rest/v1/rpc/admin_stats`, {
  method: "POST",
  headers: { ...H, "Content-Type": "application/json" },
  body: "{}",
});
const t2 = await r2.text();
const missing = t2.includes("Could not find the function");
console.log(
  `0006 admin_stats: ${missing ? "FAIL — function missing" : `OK — deployed (anon rejected: ${r2.status})`}`,
);

// 0006 — at least one admin exists?
const r3 = await fetch(`${URL}/rest/v1/profiles?select=id&role=eq.admin`, { headers: H });
const admins = await r3.json();
console.log(`0006 admin role: ${Array.isArray(admins) && admins.length > 0 ? `OK — ${admins.length} admin(s)` : "FAIL — no admin yet"}`);

// 0007 — bucket exists? ("Object not found" = bucket OK; "Bucket not found" = missing)
const r4 = await fetch(`${URL}/storage/v1/object/public/event-covers/__probe__`);
const t4 = await r4.text();
console.log(
  `0007 bucket: ${t4.includes("Bucket not found") ? "FAIL — bucket missing" : "OK — event-covers exists"}`,
);
