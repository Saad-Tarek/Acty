"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const LEADERS = [
  {
    icon: "/icons/directions_run.svg",
    title: "ランニングの先導者",
    body: "毎朝、東京の街を駆ける。その足跡は仲間たちの道標となる。",
  },
  {
    icon: "/icons/mindfulness.svg",
    title: "瞑想の道標",
    body: "静寂の中で見つけた答え。今、その道を他者と歩む喜びを知る。",
  },
  {
    icon: "/icons/self_improvement.svg",
    title: "ヨガの探求者",
    body: "呼吸と動きの調和。その先にある自分との対話を皆に伝えたい。",
  },
];

export function Layout551() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 scheme-1">
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-20 lg:ml-[5vw] lg:justify-self-end">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2">
          {LEADERS.map((l) => (
            <div key={l.title} className="group flex self-start">
              <div className="mr-6 flex-none self-start">
                <img
                  className="size-12 transition-transform duration-300 ease-out group-hover:-translate-y-1"
                  src={l.icon}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="mb-3 text-h5 font-bold md:mb-4">{l.title}</h3>
                <p>{l.body}</p>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button
                    title={`${l.title}を見る`}
                    variant="link"
                    size="link"
                    iconRight={<ChevronRight className="text-scheme-text" />}
                    asChild
                  >
                    <Link href="/events">紹介を見る</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="img-zoom relative size-full overflow-hidden lg:min-h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1400"
          alt="夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち"
          className="static size-full object-cover lg:absolute lg:inset-0"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
