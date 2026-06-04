"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const SERVICES = [
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=700",
    alt: "山あいのトレイルを歩くハイキングイベントの参加者",
    title: "イベント発見と参加",
    body: "フィットネスクラスからウェルネスワークショップまで、あなたに合ったイベントを簡単に見つけられます。",
  },
  {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=700",
    alt: "夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち",
    title: "コミュニティとのつながり",
    body: "同じ志を持つ人たちとつながり、一緒に成長できるコミュニティを形成します。",
  },
  {
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=700",
    alt: "朝日のなかで静かに瞑想するメンバーのシルエット",
    title: "プレミアムメンバーシップ特典",
    body: "限定イベントへのアクセスと優先予約で、最高のウェルネス体験を実現します。",
  },
];

export function Layout239() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-x-20">
          <div className="lg:sticky lg:top-24">
            <Kicker>サービス</Kicker>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              あなたのウェルネスジャーニーをサポート
            </h2>
            <p className="text-medium">
              Actyは単なるイベント予約アプリではありません。プレミアムなコミュニティ体験を通じて、あなたの健康目標を実現するお手伝いをします。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="secondary" title="サービスを詳しく見る" asChild>
                <Link href="/events">サービスを詳しく見る</Link>
              </Button>
              <Button
                iconRight={<ChevronRight className="text-scheme-text" />}
                variant="link"
                size="link"
                title="メンバーシップを見る"
                asChild
              >
                <Link href="/signup">メンバーシップを見る</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={
                  "flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 " +
                  (i > 0
                    ? "mt-8 border-t border-scheme-border pt-8 md:mt-10 md:pt-10"
                    : "")
                }
              >
                <div className="img-zoom w-full shrink-0 rounded-image sm:w-48 md:w-56">
                  <img
                    src={s.img}
                    alt={s.alt}
                    className="aspect-[4/3] w-full rounded-image object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-h5 font-bold">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
