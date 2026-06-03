"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout551() {
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 scheme-1">
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-20 lg:ml-[5vw] lg:justify-self-end">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2">
          <div className="flex self-start">
            <div className="mr-6 flex-none self-start">
              <img
                className="size-12"
                src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/directions_run.svg"
              />
            </div>
            <div>
              <h1 className="mb-3 text-h5 font-bold md:mb-4">
                ランニングの先導者
              </h1>
              <p>毎朝、東京の街を駆ける。その足跡は仲間たちの道標となる。</p>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Button
                  title="矢印"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight />}
                >
                  矢印
                </Button>
              </div>
            </div>
          </div>
          <div className="flex self-start">
            <div className="mr-6 flex-none self-start">
              <img
                className="size-12"
                src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/arrow_split.svg"
              />
            </div>
            <div>
              <h1 className="mb-3 text-h5 font-bold md:mb-4">瞑想の道標</h1>
              <p>静寂の中で見つけた答え。今、その道を他者と歩む喜びを知る。</p>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Button
                  title="矢印"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight />}
                >
                  矢印
                </Button>
              </div>
            </div>
          </div>
          <div className="flex self-start">
            <div className="mr-6 flex-none self-start">
              <img
                className="size-12"
                src="https://cdn.jsdelivr.net/npm/@material-symbols/svg-500@latest/rounded/arrow_split.svg"
              />
            </div>
            <div>
              <h1 className="mb-3 text-h5 font-bold md:mb-4">ヨガの探求者</h1>
              <p>呼吸と動きの調和。その先にある自分との対話を皆に伝えたい。</p>
              <div className="mt-5 flex items-center gap-4 md:mt-6">
                <Button
                  title="矢印"
                  variant="link"
                  size="link"
                  iconRight={<ChevronRight />}
                >
                  矢印
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative size-full overflow-hidden lg:min-h-[80vh]">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          alt="Relume placeholder image"
          className="static size-full object-cover lg:absolute lg:inset-0"
        />
      </div>
    </section>
  );
}
