"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const EVENTS = [
  {
    img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=900",
    alt: "早朝の街を走るランニングクラブのメンバー",
    day: "金",
    date: "09",
    month: "2月 2024",
    category: "ランニング",
    title: "朝のラン会",
    place: "公園",
    body: "仲間たちと一緒に走る。心地よい朝の空気を感じながら。",
  },
  {
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=900",
    alt: "海辺でヨガのポーズをとる参加者たち",
    day: "土",
    date: "10",
    month: "2月 2024",
    category: "ヨガ",
    title: "フロータイムヨガ",
    place: "スタジオ",
    body: "体と心を整える。静寂の中で自分と向き合う時間。",
  },
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=900",
    alt: "山あいのトレイルを歩くハイカー",
    day: "日",
    date: "11",
    month: "2月 2024",
    category: "ハイキング",
    title: "山道を歩く",
    place: "山頂",
    body: "自然の中で呼吸する。頂上で見える景色は格別だ。",
  },
];

export function Event7() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <Kicker className="justify-center">発見</Kicker>
            <h2 className="mt-3 text-h2 font-bold md:mt-4">開催予定のイベント</h2>
            <p className="mt-5 text-medium md:mt-6">
              カテゴリーや日付でフィルタして、あなたに合ったイベントを見つけましょう。
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {EVENTS.map((ev) => (
            <div key={ev.title} className="flex flex-col items-start">
              <Link
                href="/events/detail"
                className="img-zoom relative mb-5 block aspect-[3/2] w-full rounded-image md:mb-6"
                aria-label={`${ev.title}の詳細`}
              >
                <img
                  src={ev.img}
                  alt={ev.alt}
                  className="absolute size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 z-10 flex min-w-28 flex-col items-center rounded-card bg-white px-1 py-3 text-small text-neutral-darkest shadow-sm">
                  <span>{ev.day}</span>
                  <span className="text-h4 font-bold">{ev.date}</span>
                  <span>{ev.month}</span>
                </div>
              </Link>
              <Badge className="mb-3 md:mb-4">{ev.category}</Badge>
              <Link href="/events/detail">
                <h3 className="text-h5 font-bold">{ev.title}</h3>
              </Link>
              <p className="mb-2">{ev.place}</p>
              <p>{ev.body}</p>
              <Button
                title={`${ev.title}の詳細へ`}
                variant="link"
                size="link"
                iconRight={<ChevronRight className="text-scheme-text" />}
                className="mt-5 md:mt-6"
                asChild
              >
                <Link href="/events/detail">詳細へ</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button variant="secondary" title="無料で登録して参加する" asChild>
            <Link href="/signup">無料で登録して参加する</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
