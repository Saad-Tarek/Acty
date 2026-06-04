"use client";

import React, { useEffect, useState } from "react";
import { EventDetail } from "@/components/events/event-detail";

// Runtime event detail: reads ?slug= from the URL and fetches the event on the
// client, so any event (including newly created ones) works without a rebuild.
export default function Page() {
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get("slug") || "");
  }, []);

  if (slug === null) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center scheme-1" />
    );
  }

  return <EventDetail slug={slug} />;
}
