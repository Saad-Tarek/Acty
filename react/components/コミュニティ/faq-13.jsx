"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Faq13() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">よくある質問</h2>
          <p className="text-medium">
            コミュニティ参加に関する疑問にお答えします
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              誰でも参加できますか?
            </p>
            <p>
              Actyコミュニティは全ての年齢と経験レベルの方を歓迎します。初心者から経験者まで、ウェルネスへの関心があれば十分です。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              月額費用はいくらですか?
            </p>
            <p>
              基本的なコミュニティアクセスは無料です。プレミアム機能や限定イベントへのアクセスは別途料金となります。詳細はアプリ内でご確認ください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              イベントをキャンセルできますか?
            </p>
            <p>
              開始24時間前までのキャンセルは無料です。それ以降のキャンセルについてはポリシーをご確認ください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              オフラインで参加できますか?
            </p>
            <p>
              はい。ランニングクラブ、ヨガセッション、ハイキングなど多くのイベントは対面で開催されています。オンライン瞑想クラスも用意しています。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              グループチャット機能はありますか?
            </p>
            <p>
              各イベントごと、また興味別のグループチャットがあります。メンバー同士で体験をシェアしたり、質問したりできます。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              Question text goes here
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">
            Still have questions?
          </h4>
          <p className="text-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
