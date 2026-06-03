"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Cta31() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container flex flex-col items-center">
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              今すぐあなたのウェルネスを始めよう
            </h2>
            <p className="text-medium">
              Actyに参加して、プレミアムなコミュニティの一員になる
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
              <Button title="無料ではじめる">無料ではじめる</Button>
              <Button title="イベントを探す" variant="secondary">
                イベントを探す
              </Button>
            </div>
          </div>
        </div>
        <div className="img-zoom w-full rounded-image">
          <img
            src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=1800"
            className="aspect-video size-full rounded-image object-cover"
            alt="街を駆け抜けるランニングイベントの様子"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
