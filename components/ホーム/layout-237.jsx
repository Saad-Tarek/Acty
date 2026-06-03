"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout237() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <p className="mb-3 font-semibold md:mb-4">体験</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              ウェルネスの多様な世界を発見
            </h2>
            <p className="text-medium">
              Actyでは、あなたの健康目標に合わせたイベントが揃っています。ランニングクラブから瞑想セッション、ハイキングまで、すべてが一つのプラットフォームで見つかります。
            </p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12"
                  src="/icons/directions_run.svg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                ランニングクラブで仲間と走る
              </h3>
              <p>
                都市部から自然の中まで、様々なランニングイベントに参加できます。
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12"
                  src="/icons/mindfulness.svg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                ヨガと瞑想で心身を整える
              </h3>
              <p>
                プロのインストラクターによるセッションで、深いリラックスと内面の平穏を得られます。
              </p>
            </div>
            <div className="flex w-full flex-col items-center text-center">
              <div className="mb-5 md:mb-6">
                <img
                  className="size-12"
                  src="/icons/hiking.svg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                ハイキングと自然体験
              </h3>
              <p>自然の中で新しい友人と出会い、体と心をリセットします。</p>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
            <Button variant="secondary">詳細</Button>
            <Button
              iconRight={<ChevronRight className="text-scheme-text" />}
              variant="link"
              size="link"
            >
              もっと見る
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
