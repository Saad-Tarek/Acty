"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import React from "react";
import { ChevronRight } from "relume-icons";

const FEATURES = [
  {
    icon: "/icons/directions_run.svg",
    title: "ランニングクラブで仲間と走る",
    body: "都市部から自然の中まで、様々なランニングイベントに参加できます。",
  },
  {
    icon: "/icons/mindfulness.svg",
    title: "ヨガと瞑想で心身を整える",
    body: "プロのインストラクターによるセッションで、深いリラックスと内面の平穏を得られます。",
  },
  {
    icon: "/icons/hiking.svg",
    title: "ハイキングと自然体験",
    body: "自然の中で新しい友人と出会い、体と心をリセットします。",
  },
];

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <Kicker className="justify-center">体験</Kicker>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              ウェルネスの多様な世界を発見
            </h2>
            <p className="text-medium">
              Actyでは、あなたの健康目標に合わせたイベントが揃っています。ランニングクラブから瞑想セッション、ハイキングまで、すべてが一つのプラットフォームで見つかります。
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group flex w-full flex-col items-center text-center"
              >
                <div className="mb-5 flex size-16 items-center justify-center rounded-card bg-burnt-sienna-lightest transition-transform duration-300 ease-out group-hover:-translate-y-1 md:mb-6">
                  <img
                    className="size-9"
                    src={f.icon}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-5 text-h4 font-bold md:mb-6">{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
            <Button variant="secondary">すべての体験を見る</Button>
            <Button
              iconRight={<ChevronRight className="text-scheme-text" />}
              variant="link"
              size="link"
            >
              イベントカレンダー
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
