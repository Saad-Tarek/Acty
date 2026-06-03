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
            登録に関する疑問や不安について、よくある質問をまとめました。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              登録に費用はかかりますか
            </p>
            <p>
              基本的な登録は無料です。プレミアム機能や特定のイベントへのアクセスには別途料金がかかる場合があります。詳細はイベント詳細ページでご確認ください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              登録後すぐにイベントに参加できますか
            </p>
            <p>
              登録完了後、すぐにイベント一覧から参加可能なイベントを閲覧できます。各イベントの詳細ページで参加手続きを進めてください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              個人情報は安全ですか
            </p>
            <p>
              Actyは最新のセキュリティ対策を実施し、あなたの個人情報を厳重に保護しています。プライバシーポリシーで詳細をご確認ください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              登録情報を後で変更できますか
            </p>
            <p>
              はい、ログイン後にプロフィール設定から登録情報を変更できます。いつでも更新可能です。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              複数のアカウントを作成できますか
            </p>
            <p>
              1つのメールアドレスにつき1つのアカウントのみ作成できます。複数のアカウントが必要な場合はサポートにお問い合わせください。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              退会するにはどうしたらいいですか
            </p>
            <p>
              プロフィール設定から退会手続きができます。退会前に参加予定のイベントをご確認ください。
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">
            さらに質問がありますか
          </h4>
          <p className="text-medium">
            ご不明な点はお気軽にお問い合わせください。
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="問い合わせ" variant="secondary">
              問い合わせ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
