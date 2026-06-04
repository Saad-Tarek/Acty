"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

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
          <h2 className="text-h5 font-bold">参加予定のイベント</h2>
          <p className="mt-3 text-medium">
            イベントへの参加機能は近日公開予定です。まずは気になるイベントを探してみましょう。
          </p>
          <div className="mt-5">
            <Button title="イベントを見る" asChild>
              <Link href="/events">イベントを見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
