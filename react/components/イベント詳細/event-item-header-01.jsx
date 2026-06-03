"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { ChevronLeft } from "relume-icons";

export function EventItemHeader1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-20 gap-y-12 md:grid-flow-row md:gap-y-16 lg:grid-cols-2 lg:gap-y-12">
          <div className="flex flex-col items-start">
            <Button
              title="すべてのイベント"
              variant="link"
              size="link"
              iconLeft={<ChevronLeft className="text-scheme-text" />}
            >
              <a href="#">すべてのイベント</a>
            </Button>
            <h1 className="mt-6 text-h2 font-bold md:mt-8">
              朝日の中でのランニングクラブ
            </h1>
            <p className="mt-5 text-medium md:mt-6">
              東京の公園で開催される、心身ともにリフレッシュできるランニングイベント。
            </p>
            <div className="mt-5 flex items-center gap-4 md:mt-6">
              <div className="text-medium font-semibold">土曜日 2月10日</div>
              <Badge>残り10名</Badge>
            </div>
            <Card className="mt-8 flex flex-wrap justify-center gap-4 px-4 py-4 sm:flex-nowrap sm:px-6">
              <div className="flex min-w-18 flex-col items-center">
                <h3 className="text-h3 font-bold">45</h3>
                <span>日</span>
              </div>
              <div className="hidden w-px bg-scheme-border group-data-[slot=card-edgy]:w-0.5 sm:block" />
              <div className="flex min-w-18 flex-col items-center">
                <h3 className="text-h3 font-bold">12</h3>
                <span>時間</span>
              </div>
              <div className="hidden w-px bg-scheme-border group-data-[slot=card-edgy]:w-0.5 sm:block" />
              <div className="flex min-w-18 flex-col items-center">
                <h3 className="text-h3 font-bold">44</h3>
                <span>分</span>
              </div>
              <div className="hidden w-px bg-scheme-border group-data-[slot=card-edgy]:w-0.5 sm:block" />
              <div className="flex min-w-18 flex-col items-center">
                <h3 className="text-h3 font-bold">29</h3>
                <span>秒</span>
              </div>
            </Card>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form className="mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input
                  id="email"
                  type="email"
                  placeholder="メールアドレスを入力"
                />
                <Button title="参加を確定">参加を確定</Button>
              </form>
              <p className="text-tiny">
                参加を確定することで、利用規約に同意したことになります。
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="relative aspect-square">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                className="size-full rounded-image object-cover"
                alt="Relume placeholder image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
