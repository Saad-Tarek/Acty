"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Event7() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <h4 className="font-semibold">発見</h4>
            <h1 className="mt-3 text-h2 font-bold md:mt-4">イベント</h1>
            <p className="mt-5 text-medium md:mt-6">
              フィルタして、あなたに合ったものを見つける
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          <div className="flex flex-col items-start">
            <a
              href="#"
              className="relative mb-5 block aspect-[3/2] w-full md:mb-6"
            >
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="absolute size-full rounded-image object-cover"
              />
              <div className="absolute top-4 right-4 flex min-w-28 flex-col items-center rounded-card bg-scheme-foreground px-1 py-3 text-small text-scheme-text">
                <span>金</span>
                <h4 className="text-h4 font-bold">09</h4>
                <span>2月 2024</span>
              </div>
            </a>
            <Badge className="mb-3 md:mb-4">ランニング</Badge>
            <a href="#">
              <h2 className="text-h5 font-bold">朝のラン会</h2>
            </a>
            <p className="mb-2">公園</p>
            <p>仲間たちと一緒に走る。心地よい朝の空気を感じながら</p>
            <Button
              title="詳細へ"
              variant="link"
              size="link"
              iconRight={<ChevronRight className="text-scheme-text" />}
              className="mt-5 md:mt-6"
            >
              詳細へ
            </Button>
          </div>
          <div className="flex flex-col items-start">
            <a
              href="#"
              className="relative mb-5 block aspect-[3/2] w-full md:mb-6"
            >
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="absolute size-full rounded-image object-cover"
              />
              <div className="absolute top-4 right-4 flex min-w-28 flex-col items-center rounded-card bg-scheme-foreground px-1 py-3 text-small text-scheme-text">
                <span>土</span>
                <h4 className="text-h4 font-bold">10</h4>
                <span>2月 2024</span>
              </div>
            </a>
            <Badge className="mb-3 md:mb-4">ヨガ</Badge>
            <a href="#">
              <h2 className="text-h5 font-bold">フロータイムヨガ</h2>
            </a>
            <p className="mb-2">スタジオ</p>
            <p>体と心を整える。静寂の中で自分と向き合う時間</p>
            <Button
              title="詳細へ"
              variant="link"
              size="link"
              iconRight={<ChevronRight className="text-scheme-text" />}
              className="mt-5 md:mt-6"
            >
              詳細へ
            </Button>
          </div>
          <div className="flex flex-col items-start">
            <a
              href="#"
              className="relative mb-5 block aspect-[3/2] w-full md:mb-6"
            >
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt="Relume placeholder image 1"
                className="absolute size-full rounded-image object-cover"
              />
              <div className="absolute top-4 right-4 flex min-w-28 flex-col items-center rounded-card bg-scheme-foreground px-1 py-3 text-small text-scheme-text">
                <span>日</span>
                <h4 className="text-h4 font-bold">11</h4>
                <span>2月 2024</span>
              </div>
            </a>
            <Badge className="mb-3 md:mb-4">ハイキング</Badge>
            <a href="#">
              <h2 className="text-h5 font-bold">山道を歩く</h2>
            </a>
            <p className="mb-2">山頂</p>
            <p>自然の中で呼吸する。頂上で見える景色は格別だ</p>
            <Button
              title="詳細へ"
              variant="link"
              size="link"
              iconRight={<ChevronRight className="text-scheme-text" />}
              className="mt-5 md:mt-6"
            >
              詳細へ
            </Button>
          </div>
        </div>
        <div className="mt-12 flex justify-center md:mt-18 lg:mt-20">
          <Button variant="secondary" title="すべて見る">
            すべて見る
          </Button>
        </div>
      </div>
    </section>
  );
}
