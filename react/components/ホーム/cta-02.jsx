"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function Cta2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              最新イベント情報を受け取る
            </h2>
            <p className="text-medium">
              毎週のイベント情報と限定特典をメールでお届け
            </p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form className="mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4">
                <Input
                  id="email"
                  type="email"
                  placeholder="メールアドレスを入力"
                />
                <Button title="登録">登録</Button>
              </form>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "\n    <p class='text-tiny'>\n      By clicking Sign Up you're confirming that you agree with our\n      <a href='#' class='underline'>Terms and Conditions</a>.\n    </p>\n    ",
                }}
              />
            </div>
          </div>
          <div>
            <img
              src="https://d1p38huyj6upaa.cloudfront.net/default-42.jpg"
              className="w-full rounded-image object-cover"
              alt="Relume placeholder image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
