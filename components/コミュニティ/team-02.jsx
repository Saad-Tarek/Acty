"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";
import React from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

const portrait = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&q=80&w=500&h=500`;

const MEMBERS = [
  { img: portrait("1507003211169-0a1dd7228f2d"), name: "田中 健一", nameEn: "Kenichi Tanaka" },
  { img: portrait("1614644147798-f8c0fc9da7f6"), name: "鈴木 由美", nameEn: "Yumi Suzuki" },
  { img: portrait("1492562080023-ab3db95bfbce"), name: "佐藤 太郎", nameEn: "Taro Sato" },
  { img: portrait("1517841905240-472988babdf9"), name: "山田 美咲", nameEn: "Misaki Yamada" },
  { img: portrait("1519345182560-3f2917c472ef"), name: "伊藤 翔太", nameEn: "Shota Ito" },
  { img: portrait("1592621385612-4d7129426394"), name: "鈴木 麻衣", nameEn: "Mai Suzuki" },
  { img: portrait("1500648767791-00dcc994a43e"), name: "田中 拓也", nameEn: "Takuya Tanaka" },
  { img: portrait("1544005313-94ddf0286df2"), name: "佐藤 由紀", nameEn: "Yuki Sato" },
];

export function Team2() {
  const { t, locale } = useLocale();
  const s = t.community.team;
  const memberName = (m) => (locale === "en" ? m.nameEn : m.name);
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <Kicker className="justify-center">{s.kicker}</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
          <p className="text-medium">{s.lead}</p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {MEMBERS.map((m, i) => (
            <div key={m.name} className="flex flex-col text-center">
              <div className="img-zoom mb-5 rounded-image md:mb-6">
                <img
                  src={m.img}
                  alt={memberName(m)}
                  className="aspect-square size-full rounded-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mb-3 md:mb-4">
                <p className="text-large font-semibold">{memberName(m)}</p>
                <p className="text-medium">{s.roles[i]}</p>
              </div>
              <p>{s.bios[i]}</p>
              <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
                <a href="#" aria-label={`${memberName(m)} LinkedIn`}>
                  <LinkedinLogo className="size-6 text-scheme-text" />
                </a>
                <a href="#" aria-label={`${memberName(m)} X`}>
                  <XLogo className="size-6 p-0.5 text-scheme-text" />
                </a>
                <a href="#" aria-label={`${memberName(m)} Dribbble`}>
                  <DribbbleLogo className="size-6 text-scheme-text" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h3 className="mb-3 text-h4 font-bold md:mb-4">{s.careersTitle}</h3>
          <p className="text-medium">{s.careersBody}</p>
          <div className="mt-5 flex justify-center md:mt-6">
            <Button variant="secondary" title={s.careersBtn} asChild>
              <a href="mailto:careers@acty.jp">{s.careersBtn}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
