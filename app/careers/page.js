import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";

export const metadata = {
  title: "採用情報 — Acty",
  description:
    "Actyの未来を一緒に作る仲間を募集しています。ウェルネスとコミュニティの力を信じる方からのご応募をお待ちしています。",
};

const VALUES = [
  {
    title: "人を中心に考える",
    body: "数字よりも、また来週ここで会いたいと思える関係を大切にします。",
  },
  {
    title: "質にこだわる",
    body: "ひとつひとつの体験を丁寧に。妥協のないものづくりを続けます。",
  },
  {
    title: "自分も健やかに",
    body: "メンバーに勧めることを、まず自分たちが実践します。",
  },
];

const ROLES = [
  {
    title: "コミュニティマネージャー",
    type: "正社員 ・ 東京",
    body: "メンバーの声に耳を傾け、オンラインとオフラインの両方でつながりを育てる役割です。",
  },
  {
    title: "イベントオーガナイザー",
    type: "正社員 ・ 東京 / リモート",
    body: "ランニング、ヨガ、ハイキングなどのイベントを企画し、当日の運営までを担います。",
  },
  {
    title: "フロントエンドエンジニア",
    type: "正社員 ・ リモート",
    body: "Actyのプラットフォームを支える、速くて美しいプロダクト体験を一緒に作ります。",
  },
];

export default function Page() {
  return (
    <div>
      <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
        <div className="container max-w-3xl text-center">
          <Kicker className="justify-center">採用情報</Kicker>
          <h1 className="mb-5 text-h1 font-bold md:mb-6">
            ウェルネスの未来を、一緒に
          </h1>
          <p className="text-medium">
            Actyは、健やかな暮らしと本物のコミュニティを信じる人たちの集まりです。私たちと一緒に、その輪を広げてくれる仲間を探しています。
          </p>
        </div>
      </section>

      <section className="px-[5%] py-12 md:py-16 lg:py-20 scheme-2">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
            {VALUES.map((v) => (
              <div key={v.title}>
                <h2 className="mb-3 text-h5 font-bold md:mb-4">{v.title}</h2>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-h3 font-bold md:mb-10">募集ポジション</h2>
          <div className="flex flex-col">
            {ROLES.map((r, i) => (
              <div
                key={r.title}
                className={
                  "flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between md:py-8 " +
                  (i > 0 ? "border-t border-scheme-border" : "")
                }
              >
                <div>
                  <h3 className="text-h5 font-bold">{r.title}</h3>
                  <p className="mt-1 text-small text-neutral-darkest/70">
                    {r.type}
                  </p>
                  <p className="mt-3 max-w-xl">{r.body}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  title={`${r.title}に応募する`}
                  className="shrink-0 self-start sm:self-center"
                  asChild
                >
                  <a
                    href={`mailto:careers@acty.jp?subject=${encodeURIComponent(
                      r.title + "への応募",
                    )}`}
                  >
                    応募する
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-card bg-neutral-darkest-5 p-8 text-center md:mt-20 md:p-12">
            <h3 className="mb-3 text-h4 font-bold">
              ぴったりの募集が見つからない?
            </h3>
            <p className="mx-auto mb-6 max-w-md text-medium">
              あなたの得意なことを聞かせてください。これからのポジションを一緒に考えます。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button title="カジュアルに話す" asChild>
                <a href="mailto:careers@acty.jp?subject=Actyについて話したい">
                  カジュアルに話す
                </a>
              </Button>
              <Button variant="secondary" title="イベントを見る" asChild>
                <Link href="/events">イベントを見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
