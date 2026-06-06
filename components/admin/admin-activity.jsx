"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-provider";
import { listRecentActivity } from "@/lib/supabase/admin";

const DOT = {
  confirmed: "bg-silver-tree",
  waitlisted: "bg-torea-bay-light",
  cancelled: "bg-burnt-sienna",
};

export function AdminActivity() {
  const { t, locale } = useLocale();
  const a = t.admin.activity;
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    listRecentActivity()
      .then((d) => active && setRows(d))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  if (error) return <p className="text-medium">{t.admin.loadError}</p>;
  if (rows === null)
    return <p className="text-medium text-neutral-darkest/60">{t.admin.loading}</p>;
  if (rows.length === 0) return <p className="text-medium">{a.empty}</p>;

  return (
    <ul className="flex flex-col divide-y divide-scheme-border">
      {rows.map((row, i) => {
        const name = row.user?.display_name || a.anon;
        const event = row.event?.title || "—";
        const line = (a[row.status] || a.confirmed)(name, event);
        const when = new Date(row.updated_at).toLocaleString(
          locale === "ja" ? "ja-JP" : "en-US",
          { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" },
        );
        return (
          <li key={i} className="flex items-center gap-3 py-3">
            <span className={`size-2 shrink-0 rounded-full ${DOT[row.status] || DOT.confirmed}`} />
            <p className="grow text-medium">
              {row.event?.slug ? (
                <Link href={`/event?slug=${row.event.slug}`} className="underline-offset-4 hover:underline">
                  {line}
                </Link>
              ) : (
                line
              )}
            </p>
            <span className="shrink-0 text-small text-neutral-darkest/60">{when}</span>
          </li>
        );
      })}
    </ul>
  );
}
