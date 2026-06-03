"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FacebookLogo, Link, LinkedinLogo, XLogo } from "relume-icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ORGANIZERS = [
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&q=80&w=120&h=120",
    name: "田中 健一",
    role: "ウェルネスコーチ、Acty",
  },
  {
    img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&crop=faces&q=80&w=120&h=120",
    name: "鈴木 由紀",
    role: "フィットネスインストラクター、東京",
  },
  {
    img: "https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&crop=faces&q=80&w=120&h=120",
    name: "佐藤 美咲",
    role: "ヨガティーチャー、神奈川",
  },
];

export function Content32() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.5fr_1fr] lg:gap-x-20">
          <div className="order-last lg:order-none">
            <div className="lg:sticky lg:top-20 lg:max-w-xxs">
              <div>
                <h2 className="mb-5 text-medium font-bold md:mb-6">主催者</h2>
                <div className="space-y-5 md:space-y-6">
                  {ORGANIZERS.map((o) => (
                    <div key={o.name} className="flex gap-4">
                      <div className="size-12 min-h-12 min-w-12 overflow-hidden rounded-full">
                        <img
                          src={o.img}
                          alt={`${o.name}さんのポートレート`}
                          className="size-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="grow">
                        <p className="font-semibold">{o.name}</p>
                        <p className="text-small">{o.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-8 h-px bg-scheme-border" />
              <div>
                <h2 className="mb-3 text-medium font-bold md:mb-4">
                  ニュースレター登録
                </h2>
                <form
                  className="mb-3 flex flex-col gap-3 sm:gap-4"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Input
                    id="detail-newsletter-email"
                    type="email"
                    placeholder="メールアドレスを入力"
                    aria-label="メールアドレス"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    aria-invalid={status === "error"}
                    aria-describedby="detail-newsletter-status"
                  />
                  <Button title="登録" size="sm">
                    登録
                  </Button>
                </form>
                <p
                  id="detail-newsletter-status"
                  role={status === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={
                    status === "error"
                      ? "text-small font-medium text-burnt-sienna-dark"
                      : status === "success"
                        ? "text-small font-medium text-silver-tree-dark"
                        : "text-tiny"
                  }
                >
                  {status === "error"
                    ? "有効なメールアドレスを入力してください。"
                    : status === "success"
                      ? "ご登録ありがとうございます。"
                      : "登録することで、プライバシーポリシーに同意します。"}
                </p>
              </div>
              <div className="my-8 h-px bg-scheme-border" />
              <div>
                <p className="text-medium font-bold">シェア</p>
                <div className="mt-5 flex items-start gap-2 md:mt-6">
                  {[
                    { Icon: Link, label: "リンクをコピー" },
                    { Icon: LinkedinLogo, label: "LinkedInでシェア" },
                    { Icon: XLogo, label: "Xでシェア" },
                    { Icon: FacebookLogo, label: "Facebookでシェア" },
                  ].map(({ Icon, label }) => (
                    <Badge key={label} className="rounded-full border-none p-0">
                      <a
                        href="#"
                        className="size-8 rounded-full p-1"
                        aria-label={label}
                      >
                        <Icon className="size-6 text-scheme-text" />
                      </a>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="prose-base max-w-none prose-headings:font-bold prose-h2:mt-0 prose-h2:mb-4 prose-h2:text-h3 prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-h4 prose-p:mb-4 prose-p:leading-[1.7] prose-li:my-1 prose-blockquote:my-8 prose-blockquote:border-l prose-blockquote:border-l-scheme-border prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:text-large prose-blockquote:italic prose-figure:my-10 prose-figcaption:mt-2 prose-figcaption:text-small prose-figcaption:opacity-80 prose-strong:font-bold prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5">
            <h2>このイベントについて</h2>
            <p>
              朝日が街を照らしはじめる時間、私たちは公園に集まります。ゆっくりとしたウォームアップから始まり、それぞれのペースで5キロのコースを走ります。走り終えたあとは、参加者みんなでストレッチをしながら、その日の気づきを分かち合う時間を大切にしています。
            </p>
            <p>
              ひとりで走ると続かない。そんな声からこのランニングクラブは生まれました。隣に誰かがいるだけで、一歩が軽くなる。記録よりも、また来週ここで会いたいと思える関係を、私たちはつくっています。
            </p>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1400"
                alt="石段を駆け上がるランナーの足元"
                className="w-full rounded-image"
                loading="lazy"
              />
              <figcaption>
                自分のペースで。完走そのものより、続けられることを大切に。
              </figcaption>
            </figure>
            <h3>当日のタイムテーブル</h3>
            <ul>
              <li>6:30 — 公園東口に集合、受付</li>
              <li>6:45 — ウォームアップとコース説明</li>
              <li>7:00 — ランスタート（5キロ、各自のペース）</li>
              <li>7:45 — クールダウンとストレッチ</li>
              <li>8:00 — 自由交流、解散</li>
            </ul>
            <blockquote>
              「タイムは気にしなくて大丈夫。今日ここに来た。それがいちばん大きな一歩です。」
            </blockquote>
            <h3>持ち物と注意事項</h3>
            <ul>
              <li>動きやすい服装とランニングシューズ</li>
              <li>水分補給用のドリンク、汗を拭くタオル</li>
              <li>雨天時は前日夜にメールで開催可否をご案内します</li>
              <li>体調がすぐれない場合は無理をせず、見学だけでも歓迎です</li>
            </ul>
            <p>
              はじめての方が半数以上の、おだやかな会です。ペースが合わなくても、誰かが必ず一緒に走ります。気軽な気持ちで、公園で会いましょう。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
