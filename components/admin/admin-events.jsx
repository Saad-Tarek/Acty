"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import { eventDateParts } from "@/lib/format";
import { setEventStatus } from "@/lib/supabase/organizer";
import { listAllEvents } from "@/lib/supabase/admin";

export function AdminEvents() {
  const { t, locale } = useLocale();
  const a = t.admin.events;
  const o = t.organizer;
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);

  const refresh = () =>
    listAllEvents()
      .then(setRows)
      .catch(() => setError(true));

  useEffect(() => {
    refresh();
  }, []);

  if (error) return <p className="text-medium">{t.admin.loadError}</p>;
  if (rows === null)
    return <p className="text-medium text-neutral-darkest/60">{t.admin.loading}</p>;
  if (rows.length === 0) return <p className="text-medium">{a.empty}</p>;

  const statusLabel = (s) =>
    s === "published" ? o.statusPublished : s === "cancelled" ? o.statusCancelled : o.statusDraft;

  return (
    <ul className="flex flex-col divide-y divide-scheme-border">
      {rows.map((ev) => {
        const d = eventDateParts(ev.starts_at, locale);
        return (
          <li key={ev.id} className="flex flex-wrap items-start justify-between gap-3 py-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{ev.title}</p>
                <Badge className="shrink-0">{statusLabel(ev.status)}</Badge>
                {ev.members_only && <Badge className="shrink-0">{a.membersOnly}</Badge>}
              </div>
              <p className="mt-1 text-small text-neutral-darkest/70">
                {d.full} {d.time}
                {ev.location ? ` ・ ${ev.location}` : ""}
                {" ・ "}
                {a.organizer}: {ev.organizer?.display_name || "—"}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button size="sm" variant="secondary" title={a.view} asChild>
                <Link href={`/event?slug=${ev.slug}`}>{a.view}</Link>
              </Button>
              {ev.status !== "published" ? (
                <Button
                  size="sm"
                  title={o.publish}
                  onClick={async () => {
                    await setEventStatus(ev.id, "published");
                    refresh();
                  }}
                >
                  {o.publish}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  title={o.unpublish}
                  onClick={async () => {
                    await setEventStatus(ev.id, "draft");
                    refresh();
                  }}
                >
                  {o.unpublish}
                </Button>
              )}
              {ev.status !== "cancelled" && (
                <Button
                  size="sm"
                  variant="secondary"
                  title={o.cancelEvent}
                  onClick={async () => {
                    if (typeof window !== "undefined" && !window.confirm(o.confirmCancel)) return;
                    await setEventStatus(ev.id, "cancelled");
                    refresh();
                  }}
                >
                  {o.cancelEvent}
                </Button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
