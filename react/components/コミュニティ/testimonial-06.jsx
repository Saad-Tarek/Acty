"use client";

import React from "react";
import { StarFull } from "relume-icons";

export function Testimonial6() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-3">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-h2 font-bold md:mb-6">メンバーの声</h1>
          <p className="text-medium">実際の参加者たちの経験</p>
        </div>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12 lg:gap-y-16">
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <div className="mb-6 flex gap-1 md:mb-8">
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
            </div>
            <h5 className="text-h6 font-bold">
              「毎週のヨガクラスで心が軽くなった。同じ志を持つ仲間との時間は何物にも代え難い。」
            </h5>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Testimonial avatar 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <p className="font-semibold">田中 美咲</p>
                <p>ヨガインストラクター</p>
              </div>
              <div className="hidden w-px self-stretch bg-scheme-border md:block" />
              <div className="inline-block">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <div className="mb-6 flex gap-1 md:mb-8">
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
            </div>
            <h5 className="text-h6 font-bold">
              「ランニングクラブで新しい友人ができて、今では一緒に朝日を見ながら走るのが日課だ。」
            </h5>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Testimonial avatar 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <p className="font-semibold">佐藤 健太</p>
                <p>営業職、東京</p>
              </div>
              <div className="hidden w-px self-stretch bg-scheme-border md:block" />
              <div className="inline-block">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
          <div className="flex h-full max-w-lg flex-col items-start justify-start text-left">
            <div className="mb-6 flex gap-1 md:mb-8">
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
              <StarFull className="size-6 text-scheme-text" />
            </div>
            <h5 className="text-h6 font-bold">
              「瞑想イベントを通じて、自分の内面と向き合う時間の大切さを学んだ。」
            </h5>
            <div className="mt-6 flex w-full flex-col md:mt-8 md:w-auto">
              <div className="mb-4 size-14 min-h-14 min-w-14 overflow-hidden rounded-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Testimonial avatar 1"
                  className="size-full object-cover"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <p className="font-semibold">鈴木 由紀</p>
                <p>デザイナー、京都</p>
              </div>
              <div className="hidden w-px self-stretch bg-scheme-border md:block" />
              <div className="inline-block">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                  alt="Webflow logo 1"
                  className="max-h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
