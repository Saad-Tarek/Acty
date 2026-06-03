"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout239() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">サービス</p>
              <h2 className="mb-5 text-h2 font-bold md:mb-6">
                あなたのウェルネスジャーニーをサポート
              </h2>
              <p className="text-medium">
                Actyは単なるイベント予約アプリではありません。プレミアムなコミュニティ体験を通じて、あなたの健康目標を実現するお手伝いをします。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-6 w-full md:mb-8">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=900"
                  alt="山あいのトレイルを歩くハイキングイベントの参加者"
                  className="aspect-video size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                イベント発見と参加
              </h3>
              <p>
                フィットネスクラスからウェルネスワークショップまで、あなたに合ったイベントを簡単に見つけられます。
              </p>
            </div>
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-6 w-full md:mb-8">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=900"
                  alt="夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち"
                  className="aspect-video size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                コミュニティとのつながり
              </h3>
              <p>
                同じ志を持つ人たちとつながり、一緒に成長できるコミュニティを形成します。
              </p>
            </div>
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-6 w-full md:mb-8">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900"
                  alt="朝日のなかで静かに瞑想するメンバーのシルエット"
                  className="aspect-video size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mb-5 text-h4 font-bold md:mb-6">
                プレミアムメンバーシップ特典
              </h3>
              <p>
                限定イベントへのアクセスと優先予約で、最高のウェルネス体験を実現します。
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
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
