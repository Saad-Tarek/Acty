"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Header114() {
  return (
    <section className="relative px-[5%] scheme-1">
      <div className="container flex max-h-[60rem] min-h-svh">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="relative z-10 grid h-full auto-cols-fr grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col justify-start md:justify-center">
              <h1 className="hero-rise text-h1 font-bold text-balance text-white">
                Find your wellness community today
              </h1>
              <div
                className="hero-rise mt-6 flex flex-wrap gap-4 md:mt-8"
                style={{ animationDelay: "0.12s" }}
              >
                <Button title="イベントを探す" variant="alternate">
                  イベントを探す
                </Button>
                <Button title="無料ではじめる" variant="secondary-alt">
                  無料ではじめる
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <p
                className="hero-rise text-medium text-white"
                style={{ animationDelay: "0.24s" }}
              >
                Actyは、ランニングからヨガ、瞑想まで、あなたの健康を高めるイベントを集めたプラットフォームです。プレミアムな体験と真のコミュニティを求める人たちのための場所。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=2400"
          className="size-full object-cover"
          alt="海辺で朝のヨガを楽しむウェルネスコミュニティの仲間たち"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-torea-bay-darkest/85 via-neutral-darkest/60 to-neutral-darkest/65" />
      </div>
    </section>
  );
}
