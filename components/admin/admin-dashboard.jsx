"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { getMyProfile } from "@/lib/supabase/organizer";
import { getAdminStats } from "@/lib/supabase/admin";
import { AdminMembers } from "@/components/admin/admin-members";
import { AdminEvents } from "@/components/admin/admin-events";
import { AdminCategories } from "@/components/admin/admin-categories";
import { AdminActivity } from "@/components/admin/admin-activity";

const TABS = ["overview", "members", "events", "categories", "activity"];

function KpiCard({ label, value, sub }) {
  return (
    <div className="rounded-card border border-scheme-border p-5">
      <p className="text-small text-neutral-darkest/60">{label}</p>
      <p className="mt-1 text-h4 font-bold">{value}</p>
      {sub && <p className="mt-1 text-small text-neutral-darkest/60">{sub}</p>}
    </div>
  );
}

/** Tiny dependency-free bar chart for the 30-day series [{d, n}]. */
function TrendBars({ title, series, noData }) {
  const max = Math.max(1, ...series.map((p) => p.n));
  const total = series.reduce((sum, p) => sum + p.n, 0);
  return (
    <div className="rounded-card border border-scheme-border p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-small font-bold">{title}</p>
        <p className="text-small text-neutral-darkest/60">{total}</p>
      </div>
      {total === 0 ? (
        <p className="mt-4 text-small text-neutral-darkest/60">{noData}</p>
      ) : (
        <div className="mt-4 flex h-20 items-end gap-px">
          {series.map((p) => (
            <div
              key={p.d}
              title={`${p.d}: ${p.n}`}
              className="grow rounded-t-sm bg-torea-bay"
              style={{
                height: `${Math.max(p.n > 0 ? 6 : 2, (p.n / max) * 100)}%`,
                opacity: p.n > 0 ? 1 : 0.15,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Overview() {
  const { t } = useLocale();
  const k = t.admin.kpi;
  const c = t.admin.charts;
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    getAdminStats()
      .then((s) => active && setStats(s))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  if (error) return <p className="text-medium">{t.admin.loadError}</p>;
  if (!stats)
    return <p className="text-medium text-neutral-darkest/60">{t.admin.loading}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label={k.members} value={stats.users} sub={`${k.organizers}: ${stats.organizers}`} />
        <KpiCard label={k.premium} value={stats.premium} />
        <KpiCard label={k.upcoming} value={stats.events.upcoming} />
        <KpiCard
          label={k.confirmed}
          value={stats.participations.confirmed}
          sub={`${k.waitlisted}: ${stats.participations.waitlisted}`}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <TrendBars title={c.signups} series={stats.signups_30d} noData={c.noData} />
        <TrendBars title={c.joins} series={stats.joins_30d} noData={c.noData} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-scheme-border p-5">
          <p className="text-small font-bold">{c.topEvents}</p>
          {stats.top_events.length === 0 ? (
            <p className="mt-3 text-small text-neutral-darkest/60">{c.noData}</p>
          ) : (
            <ul className="mt-3 flex flex-col divide-y divide-scheme-border">
              {stats.top_events.map((ev) => (
                <li key={ev.slug} className="flex items-center justify-between gap-3 py-2">
                  <a href={`/event?slug=${ev.slug}`} className="text-small font-medium underline-offset-4 hover:underline">
                    {ev.title}
                  </a>
                  <span className="shrink-0 text-small text-neutral-darkest/60">
                    {ev.confirmed} / {ev.capacity ?? c.unlimited} {c.seats}
                    {ev.waitlisted > 0 && ` (+${ev.waitlisted})`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <KpiCard
          label={k.notifications}
          value={stats.notifications.sent}
          sub={stats.notifications.failed > 0 ? `${k.notifFailed}: ${stats.notifications.failed}` : null}
        />
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLocale();
  const a = t.admin;
  const [profile, setProfile] = useState(undefined);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (authLoading || !user) return;
    getMyProfile().then(setProfile);
  }, [authLoading, user]);

  if (authLoading || (user && profile === undefined)) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center scheme-1">
        <p className="text-medium text-neutral-darkest/60">{a.loading}</p>
      </section>
    );
  }

  if (profile?.role !== "admin") {
    return (
      <section className="px-[5%] py-24 scheme-1">
        <div className="container max-w-lg text-center">
          <h1 className="text-h3 font-bold">{a.notAdminTitle}</h1>
          <p className="mt-3 text-medium">{a.notAdminBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] py-16 md:py-24 scheme-1">
      <div className="container max-w-5xl">
        <h1 className="text-h2 font-bold">{a.title}</h1>
        <div className="mt-6 flex flex-wrap gap-2 border-b border-scheme-border pb-px">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-4 py-2 text-medium font-medium ${
                tab === key
                  ? "border-torea-bay text-torea-bay"
                  : "border-transparent text-neutral-darkest/60 hover:text-scheme-text"
              }`}
            >
              {a.tabs[key]}
            </button>
          ))}
        </div>
        <div className="mt-8">
          {tab === "overview" && <Overview />}
          {tab === "members" && <AdminMembers />}
          {tab === "events" && <AdminEvents />}
          {tab === "categories" && <AdminCategories />}
          {tab === "activity" && <AdminActivity />}
        </div>
      </div>
    </section>
  );
}
