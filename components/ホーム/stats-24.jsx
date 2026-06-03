"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIframe } from "@/components/ui/video-iframe";
import React from "react";
import { PlayCircle } from "relume-icons";

export function Stats24() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container flex flex-col items-start">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">実績</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Actyが信頼される理由
          </h2>
          <p className="text-medium">
            数字が物語る、Actyコミュニティの成長と満足度。毎日、新しい仲間がウェルネスの旅に参加しています。
          </p>
        </div>
        <Tabs
          defaultValue="tab-1"
          className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20"
        >
          <TabsList className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-1 items-center gap-x-4 gap-y-10">
            <TabsTrigger
              value="tab-1"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-0 pr-0 pl-6 text-left whitespace-normal data-[state=active]:bg-transparent md:pl-8"
            >
              <p className="mb-2 text-h1 font-bold">15000</p>
              <p className="text-h6 font-bold">アクティブメンバー</p>
              <p className="mt-2">健康と幸福を求める人たちが毎日利用</p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-0 pr-0 pl-6 text-left whitespace-normal data-[state=active]:bg-transparent md:pl-8"
            >
              <p className="mb-2 text-h1 font-bold">2500</p>
              <p className="text-h6 font-bold">開催イベント</p>
              <p className="mt-2">様々なカテゴリーで毎週開催されるイベント</p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-0 pr-0 pl-6 text-left whitespace-normal data-[state=active]:bg-transparent md:pl-8"
            >
              <p className="mb-2 text-h1 font-bold">98</p>
              <p className="text-h6 font-bold">満足度パーセント</p>
              <p className="mt-2">参加者から寄せられた高い評価と信頼</p>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-center overflow-hidden">
            <TabsContent
              value="tab-1"
              className="w-full data-[state=active]:animate-tabs"
            >
              <div className="relative aspect-[4/5] w-full">
                <img
                  src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1100"
                  alt="スタジオでヨガに取り組むメンバーたち"
                  className="size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="tab-2"
              className="w-full data-[state=active]:animate-tabs"
            >
              <div className="relative aspect-[4/5] w-full">
                <Dialog>
                  <DialogTrigger
                    className="relative flex size-full items-center justify-center"
                    aria-label="紹介動画を再生"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&q=80&w=1100"
                      alt="マットの上で深くストレッチをする参加者"
                      className="size-full overflow-hidden rounded-image object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute inset-0 z-10 rounded-image bg-neutral-darkest/50" />
                    <PlayCircle className="absolute z-20 size-20 text-white" />
                  </DialogTrigger>
                  <DialogContent>
                    <VideoIframe video="https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW" />
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            <TabsContent
              value="tab-3"
              className="w-full data-[state=active]:animate-tabs"
            >
              <div className="relative aspect-[4/5] w-full">
                <img
                  src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1100"
                  alt="石段を駆け上がるランナーの足元"
                  className="size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
