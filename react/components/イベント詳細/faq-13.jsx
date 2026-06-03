"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Faq13() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">質問</h2>
          <p className="text-medium">
            イベント参加前に知っておくべきことをまとめました。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              何を持ってくればいい？
            </p>
            <p>
              動きやすい服装とタオル、水筒があれば十分です。季節に応じて上着を持参することをお勧めします。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              初心者でも参加できる？
            </p>
            <p>
              もちろんです。すべてのレベルの人が参加できるように設計されています。インストラクターがサポートします。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              キャンセルはできるか？
            </p>
            <p>
              イベント開始の24時間前までキャンセル可能です。その後のキャンセルは返金対象外となります。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              グループで参加したい
            </p>
            <p>
              グループ割引があります。5人以上で申し込む場合は、お問い合わせください。特別な料金をご提案します。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              天候が悪い場合は？
            </p>
            <p>
              屋外イベントの場合、悪天候時は中止または延期となります。参加者には事前に通知されます。
            </p>
          </div>
          <div>
            <p className="mb-3 text-medium font-bold md:mb-4">
              駐車場はあるか？
            </p>
            <p>
              会場周辺に駐車場があります。詳細な場所情報はメール確認後に送付されます。
            </p>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">もっと知りたい？</h4>
          <p className="text-medium">
            ご不明な点はお気軽にお問い合わせください。
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="連絡する" variant="secondary">
              連絡する
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
