"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "relume-icons";
import { getEvent } from "@/lib/supabase/events";
import { eventDateParts } from "@/lib/format";
import { JoinWidget } from "@/components/events/join-widget";
import { useLocale } from "@/lib/i18n/locale-provider";

export function EventDetail({ slug }) {
  const { t, locale } = useLocale();
  const s = t.eventsPage.detail;
  const [event, setEvent] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let active = true;
    getEvent(slug)
      .then((e) => active && setEvent(e))
      .catch(() => active && setEvent(null));
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (event?.title) document.title = `${event.title} — Acty`;
  }, [event]);

  if (event === undefined) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center scheme-1">
        <p className="text-medium text-neutral-darkest/60">{s.loading}</p>
      </section>
    );
  }

  if (event === null) {
    return (
      <section className="px-[5%] py-24 text-center scheme-1">
        <div className="container max-w-lg">
          <h1 className="text-h3 font-bold">{s.notFoundTitle}</h1>
          <p className="mt-3 text-medium">{s.notFoundBody}</p>
          <Link href="/events" className="mt-4 inline-block underline">
            {s.notFoundLink}
          </Link>
        </div>
      </section>
    );
  }

  const d = eventDateParts(event.starts_at, locale);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-small"
        >
          <ChevronLeft className="text-scheme-text" />
          {s.back}
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16">
          <div className="img-zoom w-full rounded-image">
            <img
              src={event.cover_image}
              alt={event.title}
              className="aspect-[4/3] w-full rounded-image object-cover"
              fetchPriority="high"
            />
          </div>

          <div className="flex flex-col">
            {event.category_name && (
              <Badge className="mb-4 self-start">{event.category_name}</Badge>
            )}
            <h1 className="text-h2 font-bold">{event.title}</h1>
            <dl className="mt-5 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-medium md:mt-6">
              <dt className="text-neutral-darkest/60">{s.dateLabel}</dt>
              <dd className="font-semibold">
                {d.full} {d.time}
              </dd>
              <dt className="text-neutral-darkest/60">{s.placeLabel}</dt>
              <dd>{event.location}</dd>
              <dt className="text-neutral-darkest/60">{s.priceLabel}</dt>
              <dd>{event.price > 0 ? `¥${event.price.toLocaleString()}` : s.free}</dd>
            </dl>

            <div className="mt-6 md:mt-8">
              <JoinWidget event={event} />
            </div>
          </div>
        </div>

        {event.description && (
          <div className="mt-12 max-w-2xl md:mt-16">
            <h2 className="mb-4 text-h4 font-bold">{s.aboutTitle}</h2>
            <p className="leading-[1.8] whitespace-pre-line">
              {event.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
