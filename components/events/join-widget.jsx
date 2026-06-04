"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import {
  getEvent,
  getMyParticipation,
  joinEvent,
  cancelParticipation,
} from "@/lib/supabase/events";
import { seatsLeft, seatsLabel } from "@/lib/format";

export function JoinWidget({ event }) {
  const { user, loading: authLoading, configured } = useAuth();
  const { t } = useLocale();
  const j = t.eventsPage.join;
  const seats = t.eventsPage.seats;
  const [ev, setEv] = useState(event); // live copy, refreshed after mutations
  const [part, setPart] = useState(undefined); // undefined = loading
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setPart(null);
      return;
    }
    getMyParticipation(event.id)
      .then((p) => active && setPart(p))
      .catch(() => active && setPart(null));
    return () => {
      active = false;
    };
  }, [user, authLoading, event.id]);

  const left = seatsLeft(ev);
  const isFull = left === 0;

  const run = async (fn, okMsg) => {
    setBusy(true);
    setMsg("");
    setErr(false);
    try {
      const result = await fn();
      const fresh = await getEvent(event.slug).catch(() => null);
      if (fresh) setEv(fresh);
      setMsg(typeof okMsg === "function" ? okMsg(result) : okMsg);
    } catch {
      setErr(true);
      setMsg(j.msgError);
    }
    setBusy(false);
  };

  const doJoin = () =>
    run(
      async () => {
        const status = await joinEvent(event.id);
        setPart({ status });
        return status;
      },
      (status) => (status === "confirmed" ? j.msgConfirmed : j.msgWaitlisted),
    );

  const doCancel = () =>
    run(async () => {
      await cancelParticipation(event.id);
      setPart({ status: "cancelled" });
    }, j.msgCancelled);

  const card = "rounded-card border border-scheme-border p-6 md:p-7";

  if (!configured) {
    return (
      <div className={card}>
        <p className="text-medium">{j.preparing}</p>
      </div>
    );
  }

  if (!user && !authLoading) {
    return (
      <div className={card}>
        <p className="mb-1 text-medium font-semibold">{seatsLabel(ev, seats)}</p>
        <p className="mb-4 text-small text-neutral-darkest/70">{j.signinPrompt}</p>
        <Button className="w-full" title={j.signinBtn} asChild>
          <Link href="/signin">{j.signinBtn}</Link>
        </Button>
      </div>
    );
  }

  if (part === undefined || authLoading) {
    return (
      <div className={card}>
        <p className="text-medium text-neutral-darkest/60">{j.loading}</p>
      </div>
    );
  }

  const active =
    part && (part.status === "confirmed" || part.status === "waitlisted");

  return (
    <div className={card}>
      {active ? (
        <div>
          {part.status === "confirmed" ? (
            <Badge className="mb-3 border-silver-tree bg-silver-tree-lightest text-silver-tree-darker">
              {j.confirmedBadge}
            </Badge>
          ) : (
            <Badge className="mb-3 border-burnt-sienna bg-burnt-sienna-lightest text-burnt-sienna-darker">
              {j.waitlistBadge}
              {part.waitlist_pos ? j.waitlistPos(part.waitlist_pos) : ""}
            </Badge>
          )}
          <p className="mb-4 text-small text-neutral-darkest/70">
            {part.status === "confirmed" ? j.confirmedNote : j.waitlistNote}
          </p>
          <Button
            variant="secondary"
            className="w-full"
            title={j.cancelBtn}
            onClick={doCancel}
            disabled={busy}
          >
            {busy ? j.processing : j.cancelBtn}
          </Button>
        </div>
      ) : (
        <div>
          <p className="mb-1 text-medium font-semibold">{seatsLabel(ev, seats)}</p>
          <p className="mb-4 text-small text-neutral-darkest/70">
            {isFull ? j.fullNote : j.joinNote}
          </p>
          <Button
            className="w-full"
            title={isFull ? j.waitlistJoinBtn : j.joinBtn}
            onClick={doJoin}
            disabled={busy}
          >
            {busy ? j.processing : isFull ? j.waitlistJoinBtn : j.joinBtn}
          </Button>
        </div>
      )}
      {msg && (
        <p
          role={err ? "alert" : "status"}
          aria-live="polite"
          className={
            "mt-3 text-small font-medium " +
            (err ? "text-burnt-sienna-dark" : "text-silver-tree-dark")
          }
        >
          {msg}
        </p>
      )}
    </div>
  );
}
