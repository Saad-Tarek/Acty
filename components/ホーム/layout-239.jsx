"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const IMAGES = [
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=700",
    alt: "山あいのトレイルを歩くハイキングイベントの参加者",
  },
  {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=700",
    alt: "夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち",
  },
  {
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=700",
    alt: "朝日のなかで静かに瞑想するメンバーのシルエット",
  },
];

export function Layout239() {
  const { t } = useLocale();
  const s = t.home.services;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-x-20">
          <div className="lg:sticky lg:top-24">
            <Kicker>{s.kicker}</Kicker>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
            <p className="text-medium">{s.lead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button variant="secondary" title={s.ctaServices} asChild>
                <Link href="/events">{s.ctaServices}</Link>
              </Button>
              <Button
                iconRight={<ChevronRight className="text-scheme-text" />}
                variant="link"
                size="link"
                title={s.ctaMembership}
                asChild
              >
                <Link href="/signup">{s.ctaMembership}</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            {s.items.map((item, i) => (
              <div
                key={item.title}
                className={
                  "flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 " +
                  (i > 0
                    ? "mt-8 border-t border-scheme-border pt-8 md:mt-10 md:pt-10"
                    : "")
                }
              >
                <div className="img-zoom w-full shrink-0 rounded-image sm:w-48 md:w-56">
                  <img
                    src={IMAGES[i].img}
                    alt={IMAGES[i].alt}
                    className="aspect-[4/3] w-full rounded-image object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-h5 font-bold">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
