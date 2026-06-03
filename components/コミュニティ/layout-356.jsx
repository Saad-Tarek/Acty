"use client";

import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";

const STEPS = [
  {
    n: "01",
    step: "つながる",
    heading: "同じ志を持つ仲間たちと出会う",
    body: "ランニングクラブからヨガセッションまで、様々なイベントで新しい友人ができます。共通の興味を持つ人たちとの繋がりは、ウェルネスの道をより豊かにします。",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1100",
    alt: "夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち",
    sticky: "lg:top-0 lg:mb-32",
  },
  {
    n: "02",
    step: "シェアする",
    heading: "経験と知識を共有する場",
    body: "グループチャットで日々の気づきや成果をシェアできます。他のメンバーの体験から学び、自分の成長を加速させましょう。",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1100",
    alt: "海辺で一緒にヨガを楽しむメンバーたち",
    sticky: "lg:top-16 lg:-mt-16 lg:mb-16",
  },
  {
    n: "03",
    step: "成長する",
    heading: "心身の変化を実感する",
    body: "定期的なイベント参加を通じて、体力の向上、心の安定、新しいスキルの習得が実現します。コミュニティの支援があれば、目標達成は近づきます。",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1100",
    alt: "山あいのトレイルを歩くハイキングの参加者",
    sticky: "lg:top-32 lg:mb-16",
  },
];

export function Layout356() {
  return (
    <section className="scheme-2">
      <div className="sticky top-0">
        {STEPS.map((s) => (
          <Fragment key={s.n}>
            <div className="relative -top-32 h-0" />
            <div
              className={`relative border-t border-scheme-border bg-white pb-8 md:pb-14 lg:sticky lg:pb-0 ${s.sticky}`}
            >
              <div className="px-[5%]">
                <div className="container">
                  <div className="flex h-16 w-full items-center">
                    <span className="mr-5 text-medium font-semibold text-torea-bay md:mr-6">
                      {s.n}
                    </span>
                    <span className="text-medium font-semibold">{s.step}</span>
                  </div>
                  <div className="py-8 md:py-10 lg:py-12">
                    <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                      <div>
                        <h2 className="mb-5 text-h2 font-bold md:mb-6">
                          {s.heading}
                        </h2>
                        <p className="text-medium">{s.body}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                          <Button title="詳しく見る" variant="secondary">
                            詳しく見る
                          </Button>
                        </div>
                      </div>
                      <div className="img-zoom relative rounded-image">
                        <img
                          src={s.img}
                          className="h-[25rem] w-full rounded-image object-cover sm:h-[30rem] lg:h-[60vh]"
                          alt={s.alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
