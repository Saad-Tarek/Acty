"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/auth-provider";
import { listMyEvents } from "@/lib/supabase/events";
import { eventDateParts } from "@/lib/format";

function MyEvents({ enabled }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    listMyEvents()
      .then((rows) => active && setItems(rows))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [enabled]);

  if (error) {
    return (
      <p className="text-medium">
        参加情報を読み込めませんでした。時間をおいて、もう一度お試しください。
      </p>
    );
  }
  if (items === null) {
    return <p className="text-medium text-neutral-darkest/60">読み込んでいます…</p>;
  }
  if (items.length === 0) {
    return (
      <>
        <p className="text-medium">
          まだ参加予定のイベントはありません。気になるイベントを探してみましょう。
        </p>
        <div className="mt-5">
          <Button title="イベントを見る" asChild>
            <Link href="/events">イベントを見る</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-scheme-border">
      {items.map((p) => {
        const d = eventDateParts(p.event.starts_at);
        return (
          <li
            key={p.event.slug}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            <img
              src={p.event.cover_image}
              alt=""
              aria-hidden="true"
              className="size-16 shrink-0 rounded-card object-cover"
              loading="lazy"
            />
            <div className="grow">
              <Link href={`/events/${p.event.slug}`}>
                <p className="font-semibold">{p.event.title}</p>
              </Link>
              <p className="text-small text-neutral-darkest/70">
                {d.full} {d.time} ・ {p.event.location}
              </p>
            </div>
            {p.status === "confirmed" ? (
              <Badge className="shrink-0 border-silver-tree bg-silver-tree-lightest text-silver-tree-darker">
                参加予定
              </Badge>
            ) : (
              <Badge className="shrink-0 border-burnt-sienna bg-burnt-sienna-lightest text-burnt-sienna-darker">
                キャンセル待ち
              </Badge>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function Page() {
  const router = useRouter();
  const { user, loading, configured, signOut } = useAuth();

  useEffect(() => {
    if (!loading && configured && !user) router.replace("/signin");
  }, [loading, configured, user, router]);

  if (loading || (!user && configured)) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center scheme-1">
        <p className="text-medium">読み込んでいます…</p>
      </section>
    );
  }

  const name =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "ゲスト";

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container max-w-2xl">
        <h1 className="text-h2 font-bold">マイページ</h1>
        <p className="mt-3 text-medium">こんにちは、{name} さん。</p>

        <div className="mt-8 rounded-card border border-scheme-border p-6 md:p-8">
          <h2 className="text-h5 font-bold">アカウント</h2>
          <dl className="mt-4 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-medium">
            <dt className="text-neutral-darkest/60">メール</dt>
            <dd>{user?.email ?? "—"}</dd>
          </dl>
          <div className="mt-6">
            <Button
              variant="secondary"
              size="sm"
              title="サインアウト"
              onClick={async () => {
                await signOut();
                router.replace("/");
              }}
            >
              サインアウト
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-card bg-neutral-darkest-5 p-6 md:p-8">
          <h2 className="mb-5 text-h5 font-bold">参加予定のイベント</h2>
          <MyEvents enabled={Boolean(user)} />
        </div>
      </div>
    </section>
  );
}
