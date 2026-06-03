"use client";

import React from "react";
import { StarFull } from "relume-icons";

const Stars = () => (
  <div className="mb-6 flex gap-1 md:mb-8" role="img" aria-label="5つ星評価">
    {Array.from({ length: 5 }).map((_, i) => (
      <StarFull key={i} className="size-6 text-burnt-sienna" aria-hidden="true" />
    ))}
  </div>
);

export function Testimonial6() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-3">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">実際の声</h2>
          <p className="text-medium">Actyで人生が変わった</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 lg:gap-y-16">
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <Stars />
            <blockquote className="text-h6 font-bold">
              「毎週のランニングクラブで、本当の仲間ができた。単なる運動ではなく、生き方そのものが変わった。」
            </blockquote>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&q=80&w=200&h=200"
                  alt="田中 健太さんのポートレート"
                  className="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="font-semibold">田中 健太</p>
                <p>ランナー、東京</p>
              </div>
            </div>
          </div>
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <Stars />
            <blockquote className="text-h6 font-bold">
              「瞑想セッションを通じて、心の静けさを取り戻せた。プロのインストラクターと真摯なコミュニティがあるから続けられる。」
            </blockquote>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&crop=faces&q=80&w=200&h=200"
                  alt="佐藤 由美さんのポートレート"
                  className="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="font-semibold">佐藤 由美</p>
                <p>ヨガ愛好家、京都</p>
              </div>
            </div>
          </div>
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <Stars />
            <blockquote className="text-h6 font-bold">
              「ハイキングイベントで新しい世界が広がった。自然の中で同じ志の人たちと出会える場所は貴重だ。」
            </blockquote>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&crop=faces&q=80&w=200&h=200"
                  alt="鈴木 太郎さんのポートレート"
                  className="size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="font-semibold">鈴木 太郎</p>
                <p>トレッカー、長野</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
