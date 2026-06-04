"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { eventDateParts } from "@/lib/format";
import {
  getMyProfile,
  listCategories,
  listMyOrganizedEvents,
  createEvent,
  updateEvent,
  setEventStatus,
  getRoster,
} from "@/lib/supabase/organizer";

const FIELD =
  "w-full rounded-button border border-scheme-border bg-scheme-background px-3 py-2 text-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torea-bay-lighter";

function pad(n) {
  return String(n).padStart(2, "0");
}
function isoToLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function localInputToIso(value) {
  return value ? new Date(value).toISOString() : null;
}

function EventForm({ initial, categories, onDone, onCancel }) {
  const { t } = useLocale();
  const f = t.organizer.form;
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    category_id: initial?.category_id ?? "",
    description: initial?.description ?? "",
    location: initial?.location ?? "",
    start: isoToLocalInput(initial?.starts_at),
    end: isoToLocalInput(initial?.ends_at),
    capacity: initial?.capacity ?? "",
    price: initial?.price ?? "",
    cover_image: initial?.cover_image ?? "",
    members_only: initial?.members_only ?? false,
    status: initial?.status === "cancelled" ? "draft" : initial?.status ?? "draft",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.start) {
      setErr(f.required);
      return;
    }
    setBusy(true);
    setErr("");
    const payload = {
      ...form,
      starts_at: localInputToIso(form.start),
      ends_at: localInputToIso(form.end),
    };
    try {
      if (initial?.id) await updateEvent(initial.id, payload);
      else await createEvent(payload);
      onDone();
    } catch {
      setErr(f.errSave);
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-4 grid grid-cols-1 gap-4 rounded-card border border-scheme-border p-5 md:p-6"
    >
      <p className="text-h6 font-bold">{initial?.id ? f.editTitle : f.newTitle}</p>
      <div className="grid gap-2">
        <Label htmlFor="ev-title">{f.title}</Label>
        <Input id="ev-title" value={form.title} onChange={set("title")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ev-cat">{f.category}</Label>
          <select id="ev-cat" className={FIELD} value={form.category_id} onChange={set("category_id")}>
            <option value="">{f.noCategory}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ev-loc">{f.location}</Label>
          <Input id="ev-loc" value={form.location} onChange={set("location")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ev-desc">{f.description}</Label>
        <textarea id="ev-desc" rows={4} className={FIELD} value={form.description} onChange={set("description")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ev-start">{f.start}</Label>
          <Input id="ev-start" type="datetime-local" value={form.start} onChange={set("start")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ev-end">{f.end}</Label>
          <Input id="ev-end" type="datetime-local" value={form.end} onChange={set("end")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ev-cap">{f.capacity}</Label>
          <Input id="ev-cap" type="number" min="1" value={form.capacity} onChange={set("capacity")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ev-price">{f.price}</Label>
          <Input id="ev-price" type="number" min="0" value={form.price} onChange={set("price")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ev-cover">{f.cover}</Label>
        <Input id="ev-cover" type="url" placeholder="https://…" value={form.cover_image} onChange={set("cover_image")} />
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-medium">
          <input type="checkbox" checked={form.members_only} onChange={set("members_only")} />
          {f.membersOnly}
        </label>
        <select className={FIELD + " max-w-40"} value={form.status} onChange={set("status")}>
          <option value="draft">{t.organizer.statusDraft}</option>
          <option value="published">{t.organizer.statusPublished}</option>
        </select>
      </div>
      {err && <p className="text-small font-medium text-burnt-sienna-dark">{err}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={busy} title={f.save}>
          {busy ? f.saving : f.save}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} title={f.cancel}>
          {f.cancel}
        </Button>
      </div>
    </form>
  );
}

function Roster({ eventId }) {
  const { t, locale } = useLocale();
  const r = t.organizer.rosterPanel;
  const [rows, setRows] = useState(null);
  useEffect(() => {
    let active = true;
    getRoster(eventId)
      .then((d) => active && setRows(d))
      .catch(() => active && setRows([]));
    return () => {
      active = false;
    };
  }, [eventId]);

  if (rows === null)
    return <p className="mt-3 text-small text-neutral-darkest/60">{r.loading}</p>;
  if (rows.length === 0)
    return <p className="mt-3 text-small text-neutral-darkest/60">{r.empty}</p>;

  const confirmed = rows.filter((x) => x.status === "confirmed");
  const waiting = rows.filter((x) => x.status === "waitlisted");
  const name = (x) => x.user?.display_name || r.anon;

  return (
    <div className="mt-3 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-small font-bold">
          {r.confirmed} ({confirmed.length})
        </p>
        <ul className="text-small">
          {confirmed.map((x, i) => (
            <li key={i} className="py-1">{name(x)}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-small font-bold">
          {r.waitlist} ({waiting.length})
        </p>
        <ul className="text-small">
          {waiting.map((x, i) => (
            <li key={i} className="py-1">
              {x.waitlist_pos}. {name(x)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OrganizerDashboard() {
  const { user, loading: authLoading, configured } = useAuth();
  const { t, locale } = useLocale();
  const o = t.organizer;
  const [profile, setProfile] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState(null);
  const [editing, setEditing] = useState(null); // null | "new" | eventObject
  const [rosterFor, setRosterFor] = useState(null);

  const refresh = () =>
    listMyOrganizedEvents()
      .then(setEvents)
      .catch(() => setEvents([]));

  useEffect(() => {
    if (authLoading || !user) return;
    getMyProfile().then(setProfile);
    listCategories().then(setCategories);
    refresh();
  }, [authLoading, user]);

  const statusLabel = (s) =>
    s === "published" ? o.statusPublished : s === "cancelled" ? o.statusCancelled : o.statusDraft;

  if (authLoading || (user && profile === undefined)) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center scheme-1">
        <p className="text-medium text-neutral-darkest/60">{o.loading}</p>
      </section>
    );
  }

  const isOrganizer = profile?.role === "organizer" || profile?.role === "admin";

  if (!isOrganizer) {
    return (
      <section className="px-[5%] py-24 scheme-1">
        <div className="container max-w-lg text-center">
          <h1 className="text-h3 font-bold">{o.notOrganizerTitle}</h1>
          <p className="mt-3 text-medium">{o.notOrganizerBody}</p>
          <div className="mt-5">
            <Button title={o.requestBtn} asChild>
              <a href="mailto:hello@acty.jp?subject=Organizer access">{o.requestBtn}</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] py-16 md:py-24 scheme-1">
      <div className="container max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-h2 font-bold">{o.title}</h1>
          {editing === null && (
            <Button title={o.createBtn} onClick={() => setEditing("new")}>
              {o.createBtn}
            </Button>
          )}
        </div>

        {editing === "new" && (
          <EventForm
            categories={categories}
            onCancel={() => setEditing(null)}
            onDone={() => {
              setEditing(null);
              refresh();
            }}
          />
        )}

        <div className="mt-8 flex flex-col">
          {events === null ? (
            <p className="text-medium text-neutral-darkest/60">{o.loading}</p>
          ) : events.length === 0 && editing === null ? (
            <p className="text-medium">{o.empty}</p>
          ) : (
            events.map((ev) => {
              const d = eventDateParts(ev.starts_at, locale);
              const isEditing = editing && editing.id === ev.id;
              return (
                <div
                  key={ev.id}
                  className="border-t border-scheme-border py-5 first:border-t-0"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">{ev.title}</p>
                        <Badge className="shrink-0">{statusLabel(ev.status)}</Badge>
                      </div>
                      <p className="mt-1 text-small text-neutral-darkest/70">
                        {d.full} {d.time} ・ {ev.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" title={o.edit} onClick={() => setEditing(isEditing ? null : ev)}>
                        {o.edit}
                      </Button>
                      <Button size="sm" variant="secondary" title={o.roster} onClick={() => setRosterFor(rosterFor === ev.id ? null : ev.id)}>
                        {o.roster}
                      </Button>
                      {ev.status !== "published" ? (
                        <Button size="sm" title={o.publish} onClick={async () => { await setEventStatus(ev.id, "published"); refresh(); }}>
                          {o.publish}
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" title={o.unpublish} onClick={async () => { await setEventStatus(ev.id, "draft"); refresh(); }}>
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
                  </div>
                  {isEditing && (
                    <EventForm
                      initial={ev}
                      categories={categories}
                      onCancel={() => setEditing(null)}
                      onDone={() => {
                        setEditing(null);
                        refresh();
                      }}
                    />
                  )}
                  {rosterFor === ev.id && <Roster eventId={ev.id} />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
