"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

export function Team2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">運営陣</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            コミュニティを支える者たち
          </h2>
          <p className="text-medium">
            Actyの心臓部。毎日、メンバーの成長を見守り、支える。
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">田中 健一</p>
              <p className="text-medium">創設者兼CEO</p>
            </div>
            <p>
              ウェルネスの未来を信じ、コミュニティを築き上げた。その情熱は今も変わらない。
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">鈴木 由美</p>
              <p className="text-medium">コミュニティマネージャー</p>
            </div>
            <p>
              毎日、メンバーの声に耳を傾け、つながりを深める仕事をしている。
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">佐藤 太郎</p>
              <p className="text-medium">イベントディレクター</p>
            </div>
            <p>
              各イベントの企画から運営まで。質の高い体験を作ることが使命だ。
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">山田 美咲</p>
              <p className="text-medium">ウェルネスコーチ</p>
            </div>
            <p>メンバーの目標達成をサポート。心身の変化を一緒に喜ぶ。</p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">伊藤 翔太</p>
              <p className="text-medium">テクノロジー責任者</p>
            </div>
            <p>プラットフォームの裏側で、シームレスな体験を実現させている。</p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">鈴木 麻衣</p>
              <p className="text-medium">パートナーシップ担当</p>
            </div>
            <p>
              ウェルネスブランドとの連携を通じて、コミュニティを豊かにする。
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">田中 拓也</p>
              <p className="text-medium">コンテンツ制作者</p>
            </div>
            <p>メンバーの物語を記録し、コミュニティの価値を世界に伝える。</p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <div className="mx-auto w-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </div>
            </div>
            <div className="mb-3 md:mb-4">
              <p className="text-large font-semibold">佐藤 由紀</p>
              <p className="text-medium">メンタルヘルス専門家</p>
            </div>
            <p>心の健康を第一に。メンバーの内面的な成長を支援している。</p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">採用情報</h4>
          <p className="text-medium">
            Actyの未来を一緒に作る仲間を探しています。
          </p>
          <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
            <Button variant="secondary">募集要項を見る</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
