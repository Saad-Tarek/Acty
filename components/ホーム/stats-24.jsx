"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIframe } from "@/components/ui/video-iframe";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";
import React from "react";
import { PlayCircle } from "relume-icons";

const TRIGGER =
  "group flex-col items-start justify-start rounded-card border border-transparent px-5 py-5 text-left whitespace-normal transition-colors duration-200 hover:bg-neutral-darkest-5 data-[state=active]:border-torea-bay-lighter data-[state=active]:bg-torea-bay-lightest md:px-6";

function StatTrigger({ value, figure, label, note }) {
  return (
    <TabsTrigger value={value} className={TRIGGER}>
      <p className="mb-2 text-h1 font-bold transition-colors group-data-[state=active]:text-torea-bay">
        {figure}
      </p>
      <p className="text-h6 font-bold">{label}</p>
      <p className="mt-2">{note}</p>
    </TabsTrigger>
  );
}

export function Stats24() {
  const { t } = useLocale();
  const s = t.home.stats;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container flex flex-col items-start">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
          <p className="text-medium">{s.lead}</p>
        </div>
        <Tabs
          defaultValue="tab-1"
          className="grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20"
        >
          <TabsList className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-1 items-stretch gap-x-4 gap-y-6">
            <StatTrigger
              value="tab-1"
              figure="15000"
              label={s.items[0].label}
              note={s.items[0].note}
            />
            <StatTrigger
              value="tab-2"
              figure="2500"
              label={s.items[1].label}
              note={s.items[1].note}
            />
            <StatTrigger
              value="tab-3"
              figure="98"
              label={s.items[2].label}
              note={s.items[2].note}
            />
          </TabsList>
          <div className="flex items-center justify-center overflow-hidden">
            <TabsContent
              value="tab-1"
              className="w-full data-[state=active]:animate-tabs"
            >
              <div className="img-zoom relative aspect-[4/5] w-full rounded-image">
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
                    className="group relative flex size-full items-center justify-center overflow-hidden rounded-image"
                    aria-label="紹介動画を再生"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&q=80&w=1100"
                      alt="マットの上で深くストレッチをする参加者"
                      className="size-full rounded-image object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute inset-0 z-10 rounded-image bg-neutral-darkest/45 transition-colors group-hover:bg-neutral-darkest/30" />
                    <PlayCircle className="absolute z-20 size-20 text-white transition-transform group-hover:scale-110" />
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
              <div className="img-zoom relative aspect-[4/5] w-full rounded-image">
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
