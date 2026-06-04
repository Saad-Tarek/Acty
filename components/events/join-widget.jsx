"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import {
  getMyParticipation,
  joinEvent,
  cancelParticipation,
} from "@/lib/supabase/events";
import { seatsLeft, seatsLabel } from "@/lib/format";

export function JoinWidget({ event }) {
  const { user, loading: authLoading, configured } = useAuth();
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

  const left = seatsLeft(event);
  const isFull = left === 0;

  const run = async (fn, okMsg) => {
    setBusy(true);
    setMsg("");
    setErr(false);
    try {
      const result = await fn();
      setMsg(typeof okMsg === "function" ? okMsg(result) : okMsg);
    } catch {
      setErr(true);
      setMsg("処理に失敗しました。時間をおいて、もう一度お試しください。");
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
      (status) =>
        status === "confirmed"
          ? "参加が確定しました。"
          : "満席のため、キャンセル待ちに登録しました。空きが出ると繰り上がります。",
    );

  const doCancel = () =>
    run(async () => {
      await cancelParticipation(event.id);
      setPart({ status: "cancelled" });
    }, "参加をキャンセルしました。");

  const card =
    "rounded-card border border-scheme-border p-6 md:p-7";

  if (!configured) {
    return (
      <div className={card}>
        <p className="text-medium">参加機能は現在準備中です。</p>
      </div>
    );
  }

  if (!user && !authLoading) {
    return (
      <div className={card}>
        <p className="mb-1 text-medium font-semibold">{seatsLabel(event)}</p>
        <p className="mb-4 text-small text-neutral-darkest/70">
          参加するにはサインインしてください。登録は無料です。
        </p>
        <Button className="w-full" title="サインインして参加" asChild>
          <Link href="/signin">サインインして参加</Link>
        </Button>
      </div>
    );
  }

  if (part === undefined || authLoading) {
    return (
      <div className={card}>
        <p className="text-medium text-neutral-darkest/60">読み込んでいます…</p>
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
              参加予定
            </Badge>
          ) : (
            <Badge className="mb-3 border-burnt-sienna bg-burnt-sienna-lightest text-burnt-sienna-darker">
              キャンセル待ち
              {part.waitlist_pos ? `（${part.waitlist_pos}番目）` : ""}
            </Badge>
          )}
          <p className="mb-4 text-small text-neutral-darkest/70">
            {part.status === "confirmed"
              ? "あなたの参加は確定しています。当日お会いしましょう。"
              : "空きが出ると自動的に繰り上がり、メールでお知らせします。"}
          </p>
          <Button
            variant="secondary"
            className="w-full"
            title="参加をキャンセル"
            onClick={doCancel}
            disabled={busy}
          >
            {busy ? "処理中…" : "参加をキャンセル"}
          </Button>
        </div>
      ) : (
        <div>
          <p className="mb-1 text-medium font-semibold">{seatsLabel(event)}</p>
          <p className="mb-4 text-small text-neutral-darkest/70">
            {isFull
              ? "満席です。キャンセル待ちに登録すると、空きが出たときに繰り上がります。"
              : "ワンタップで参加できます。前日までキャンセル可能です。"}
          </p>
          <Button
            className="w-full"
            title={isFull ? "キャンセル待ちに登録" : "このイベントに参加"}
            onClick={doJoin}
            disabled={busy}
          >
            {busy
              ? "処理中…"
              : isFull
                ? "キャンセル待ちに登録"
                : "このイベントに参加"}
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
