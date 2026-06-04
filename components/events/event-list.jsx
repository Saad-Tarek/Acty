"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { ChevronRight } from "relume-icons";
import { listEvents } from "@/lib/supabase/events";
import { eventDateParts, seatsLabel } from "@/lib/format";

function EventCard({ ev }) {
  const d = eventDateParts(ev.starts_at);
  return (
    <div className="flex flex-col items-start">
      <Link
        href={`/events/${ev.slug}`}
        className="img-zoom relative mb-5 block aspect-[3/2] w-full rounded-image md:mb-6"
        aria-label={`${ev.title}の詳細`}
      >
        <img
          src={ev.cover_image}
          alt={ev.title}
          className="absolute size-full rounded-image object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 right-4 z-10 flex min-w-28 flex-col items-center rounded-card bg-white px-1 py-3 text-small text-neutral-darkest shadow-sm">
          <span>{d.weekday}</span>
          <span className="text-h4 font-bold">{d.day}</span>
          <span>{d.month}</span>
        </div>
      </Link>
      {ev.category_name && <Badge className="mb-3 md:mb-4">{ev.category_name}</Badge>}
      <Link href={`/events/${ev.slug}`}>
        <h3 className="text-h5 font-bold">{ev.title}</h3>
      </Link>
      <p className="mb-2">{ev.location}</p>
      <p className="text-small text-neutral-darkest/70">{seatsLabel(ev)}</p>
      <Button
        title={`${ev.title}の詳細へ`}
        variant="link"
        size="link"
        iconRight={<ChevronRight className="text-scheme-text" />}
        className="mt-5 md:mt-6"
        asChild
      >
        <Link href={`/events/${ev.slug}`}>詳細へ</Link>
      </Button>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-start">
      <div className="mb-5 aspect-[3/2] w-full rounded-image bg-neutral-darkest-5 md:mb-6" />
      <div className="mb-3 h-5 w-20 rounded-button bg-neutral-darkest-5" />
      <div className="mb-2 h-6 w-2/3 rounded bg-neutral-darkest-5" />
      <div className="h-4 w-1/3 rounded bg-neutral-darkest-5" />
    </div>
  );
}

export function EventList() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    listEvents()
      .then((rows) => active && setEvents(rows))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <Kicker className="justify-center">発見</Kicker>
            <h2 className="mt-3 text-h2 font-bold md:mt-4">開催予定のイベント</h2>
            <p className="mt-5 text-medium md:mt-6">
              気になるイベントを見つけて、ワンタップで参加しましょう。
            </p>
          </div>
        </div>

        {error ? (
          <p className="text-center text-medium">
            イベントを読み込めませんでした。時間をおいて、もう一度お試しください。
          </p>
        ) : events === null ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-medium">
            現在予定されているイベントはありません。また近いうちにご確認ください。
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {events.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
