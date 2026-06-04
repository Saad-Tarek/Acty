import React from "react";
import { EventDetail } from "@/components/events/event-detail";

// Static export: pre-render one page per published event slug at build time.
export const dynamicParams = false;

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function fetchSummaries(query) {
  if (!SB_URL || !SB_KEY) return [];
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/event_summaries?${query}`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Seed slugs (from migration 0002) used as a fallback so the export always
// produces pages even if the DB isn't reachable/seeded at build time. The page
// itself fetches its data client-side and shows a "not found" state otherwise.
const SEED_SLUGS = [
  "asa-no-run",
  "flow-time-yoga",
  "mori-wo-aruku-hiking",
  "yugure-meditation",
  "weekend-long-run",
  "sunrise-yoga",
];

export async function generateStaticParams() {
  const rows = await fetchSummaries("select=slug");
  const slugs = rows.length ? rows.map((r) => r.slug) : SEED_SLUGS;
  // De-dupe in case the live set overlaps the seed list.
  return [...new Set(slugs)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rows = await fetchSummaries(`select=title&slug=eq.${slug}`);
  const title = rows[0]?.title;
  return { title: title ? `${title} — Acty` : "イベント — Acty" };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <EventDetail slug={slug} />;
}
