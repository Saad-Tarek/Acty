"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export function Cta31() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="relative overflow-hidden rounded-image">
          <img
            src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=1800"
            className="absolute inset-0 size-full object-cover"
            alt="街を駆け抜けるランニングイベントの様子"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burnt-sienna-darker/85 via-neutral-darkest/70 to-neutral-darkest/35" />
          <div className="relative max-w-xl px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32">
            <h2 className="text-h2 font-bold text-white">
              今すぐあなたのウェルネスを始めよう
            </h2>
            <p className="mt-5 text-medium text-white md:mt-6">
              Actyに参加して、プレミアムなコミュニティの一員に。最初のイベントは無料で参加できます。
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="無料ではじめる" variant="alternate">
                無料ではじめる
              </Button>
              <Button title="イベントを探す" variant="secondary-alt">
                イベントを探す
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
