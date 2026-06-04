import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";

export const metadata = {
  title: "ブログ — Acty",
  description:
    "ウェルネス、コミュニティ、そしてイベントの舞台裏。Actyのブログは近日公開予定です。",
};

export default function Page() {
  return (
    <section className="px-[5%] py-24 md:py-32 lg:py-40 scheme-1">
      <div className="container max-w-2xl text-center">
        <Kicker className="justify-center">ブログ</Kicker>
        <h1 className="mb-5 text-h1 font-bold md:mb-6">近日公開予定</h1>
        <p className="text-medium">
          ウェルネスのヒント、メンバーの物語、イベントの舞台裏。私たちが大切にしていることを、これから少しずつお届けしていきます。最新情報はニュースレターでお知らせします。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
          <Button title="イベントを見る" asChild>
            <Link href="/events">イベントを見る</Link>
          </Button>
          <Button variant="secondary" title="コミュニティを知る" asChild>
            <Link href="/community">コミュニティを知る</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
