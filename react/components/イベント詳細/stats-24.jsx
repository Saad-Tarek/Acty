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
          <h1 className="mb-5 text-h2 font-bold md:mb-6">
            数字が語る、このコミュニティの力
          </h1>
          <p className="text-medium">
            毎週のランニングクラブから瞑想イベントまで、参加者たちは確実な変化を感じている。数字はそれを証明する。
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
              <h2 className="mb-2 text-h1 font-bold">92%</h2>
              <h3 className="text-h6 font-bold">参加者の満足度</h3>
              <p className="mt-2">イベント後のアンケートで高い評価を獲得</p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-0 pr-0 pl-6 text-left whitespace-normal data-[state=active]:bg-transparent md:pl-8"
            >
              <h2 className="mb-2 text-h1 font-bold">92%</h2>
              <h3 className="text-h6 font-bold">参加者の満足度</h3>
              <p className="mt-2">イベント後のアンケートで高い評価を獲得</p>
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="flex-col items-start justify-start rounded-none border-0 border-l py-0 pr-0 pl-6 text-left whitespace-normal data-[state=active]:bg-transparent md:pl-8"
            >
              <h2 className="mb-2 text-h1 font-bold">92%</h2>
              <h3 className="text-h6 font-bold">参加者の満足度</h3>
              <p className="mt-2">イベント後のアンケートで高い評価を獲得</p>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-center overflow-hidden">
            <TabsContent
              value="tab-1"
              className="data-[state=active]:animate-tabs"
            >
              <div className="relative size-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 1"
                  className="size-full rounded-image object-cover"
                />
              </div>
            </TabsContent>
            <TabsContent
              value="tab-2"
              className="data-[state=active]:animate-tabs"
            >
              <div className="relative size-full">
                <Dialog>
                  <DialogTrigger className="relative flex w-full items-center justify-center">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg"
                      alt="Relume placeholder image 2"
                      className="size-full overflow-hidden rounded-image object-cover"
                    />
                    <span className="absolute inset-0 z-10 bg-neutral-darkest/50" />
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
              className="data-[state=active]:animate-tabs"
            >
              <div className="relative size-full">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                  alt="Relume placeholder image 3"
                  className="size-full rounded-image object-cover"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
