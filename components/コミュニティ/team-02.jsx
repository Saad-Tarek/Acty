"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import React from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

const portrait = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&q=80&w=500&h=500`;

const MEMBERS = [
  {
    img: portrait("1507003211169-0a1dd7228f2d"),
    name: "田中 健一",
    role: "創設者兼CEO",
    body: "ウェルネスの未来を信じ、コミュニティを築き上げた。その情熱は今も変わらない。",
  },
  {
    img: portrait("1614644147798-f8c0fc9da7f6"),
    name: "鈴木 由美",
    role: "コミュニティマネージャー",
    body: "毎日、メンバーの声に耳を傾け、つながりを深める仕事をしている。",
  },
  {
    img: portrait("1492562080023-ab3db95bfbce"),
    name: "佐藤 太郎",
    role: "イベントディレクター",
    body: "各イベントの企画から運営まで。質の高い体験を作ることが使命だ。",
  },
  {
    img: portrait("1517841905240-472988babdf9"),
    name: "山田 美咲",
    role: "ウェルネスコーチ",
    body: "メンバーの目標達成をサポート。心身の変化を一緒に喜ぶ。",
  },
  {
    img: portrait("1519345182560-3f2917c472ef"),
    name: "伊藤 翔太",
    role: "テクノロジー責任者",
    body: "プラットフォームの裏側で、快適な体験を静かに支えている。",
  },
  {
    img: portrait("1592621385612-4d7129426394"),
    name: "鈴木 麻衣",
    role: "パートナーシップ担当",
    body: "ウェルネスブランドとの連携を通じて、コミュニティを豊かにする。",
  },
  {
    img: portrait("1500648767791-00dcc994a43e"),
    name: "田中 拓也",
    role: "コンテンツ制作者",
    body: "メンバーの物語を記録し、コミュニティの価値を世界に伝える。",
  },
  {
    img: portrait("1544005313-94ddf0286df2"),
    name: "佐藤 由紀",
    role: "メンタルヘルス専門家",
    body: "心の健康を第一に。メンバーの内面的な成長を支援している。",
  },
];

export function Team2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <Kicker className="justify-center">運営陣</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            コミュニティを支える者たち
          </h2>
          <p className="text-medium">
            Actyの心臓部。毎日、メンバーの成長を見守り、支える。
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {MEMBERS.map((m) => (
            <div key={m.name} className="flex flex-col text-center">
              <div className="img-zoom mb-5 rounded-image md:mb-6">
                <img
                  src={m.img}
                  alt={`${m.name}さんのポートレート`}
                  className="aspect-square size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <p className="text-large font-semibold">{m.name}</p>
                <p className="text-medium">{m.role}</p>
              </div>
              <p>{m.body}</p>
              <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
                <a href="#" aria-label={`${m.name}のLinkedIn`}>
                  <LinkedinLogo className="size-6 text-scheme-text" />
                </a>
                <a href="#" aria-label={`${m.name}のX`}>
                  <XLogo className="size-6 p-0.5 text-scheme-text" />
                </a>
                <a href="#" aria-label={`${m.name}のDribbble`}>
                  <DribbbleLogo className="size-6 text-scheme-text" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h3 className="mb-3 text-h4 font-bold md:mb-4">採用情報</h3>
          <p className="text-medium">
            Actyの未来を一緒に作る仲間を探しています。
          </p>
          <div className="mt-5 flex justify-center md:mt-6">
            <Button variant="secondary">募集要項を見る</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
