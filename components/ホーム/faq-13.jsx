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
            Actyについて、よくお問い合わせいただく内容をまとめました
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              Actyはどのようなプラットフォーム?
            </p>
            <p>
              Actyは、ランニングからヨガ、瞑想、ハイキングまで、様々なウェルネスイベントを一つのプラットフォームで提供しています。プレミアムなコミュニティ体験を通じて、あなたの健康目標をサポートします。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              初心者でも参加できますか?
            </p>
            <p>
              もちろんです。Actyのイベントは、初心者からベテランまで、すべてのレベルの人たちを歓迎しています。各イベントには経験豊富なインストラクターがいますので、安心して参加できます。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              メンバーシップの費用はいくら?
            </p>
            <p>
              Actyは無料で基本的なイベント情報を閲覧できます。プレミアムメンバーシップは月額制で、限定イベントへのアクセスと優先予約が可能になります。詳細はイベント一覧ページをご確認ください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              イベントをキャンセルできますか?
            </p>
            <p>
              はい、イベント開始の24時間前までであれば、キャンセルが可能です。キャンセル手続きはアカウントページから簡単に行えます。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              コミュニティ機能はどう使う?
            </p>
            <p>
              コミュニティページでは、同じ興味を持つメンバーとつながり、イベント後の交流や情報交換ができます。あなたのプロフィールを作成して、他のメンバーと繋がりましょう。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              プライバシーは保護されますか?
            </p>
            <p>
              Actyは、あなたの個人情報を厳格に保護しています。利用規約とプライバシーポリシーに従い、安全で信頼できるプラットフォームを維持しています。
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">さらに質問がある?</h4>
          <p className="text-medium">お気軽にお問い合わせください</p>
          <div className="mt-6 md:mt-8">
            <Button title="お問い合わせ" variant="secondary">
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
