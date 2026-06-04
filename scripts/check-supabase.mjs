// Verifies the Supabase connection WITHOUT printing the key.
// Reads .env.local at runtime, hits the public `categories` table (anon-readable
// per RLS), and reports whether the key works and the migration has been run.
import { readFile } from "node:fs/promises";

const env = await readFile(new URL("../.env.local", import.meta.url), "utf8");
const get = (k) =>
  (env.split(/\r?\n/).find((l) => l.startsWith(k + "=")) || "").slice(k.length + 1).trim();

const url = get("NEXT_PUBLIC_SUPABASE_URL");
const key = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");

console.log("URL set:      ", Boolean(url));
console.log("Anon key set: ", Boolean(key), key ? `(length ${key.length})` : "");
if (!url || !key) {
  console.log("RESULT: env not fully set");
  process.exit(0);
}

try {
  const res = await fetch(`${url}/rest/v1/categories?select=slug,name&order=slug`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  console.log("HTTP status:  ", res.status);
  const body = await res.json();
  if (res.status === 200 && Array.isArray(body)) {
    console.log("RESULT: key works AND migration ran.");
    console.log("categories:", body.map((r) => `${r.slug}/${r.name}`).join(", ") || "(none)");
  } else if (res.status === 401) {
    console.log("RESULT: 401 — anon key invalid or wrong project.");
  } else if (res.status === 404 || (body && /relation|does not exist/i.test(JSON.stringify(body)))) {
    console.log("RESULT: key works, but the `categories` table is missing → migration NOT run yet.");
    console.log("detail:", JSON.stringify(body));
  } else {
    console.log("RESULT: unexpected response:", JSON.stringify(body));
  }
} catch (e) {
  console.log("RESULT: request failed:", e.message);
}
