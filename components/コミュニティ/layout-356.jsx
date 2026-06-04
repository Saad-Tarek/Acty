"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import Link from "next/link";
import React, { Fragment } from "react";

const STEP_META = [
  {
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1100",
    alt: "夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち",
    sticky: "lg:top-0 lg:mb-32",
  },
  {
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1100",
    alt: "海辺で一緒にヨガを楽しむメンバーたち",
    sticky: "lg:top-16 lg:-mt-16 lg:mb-16",
  },
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1100",
    alt: "山あいのトレイルを歩くハイキングの参加者",
    sticky: "lg:top-32 lg:mb-16",
  },
];

export function Layout356() {
  const { t } = useLocale();
  const s = t.community.steps;
  return (
    <section className="scheme-2">
      <div className="sticky top-0">
        {s.items.map((item, i) => (
          <Fragment key={i}>
            <div className="relative -top-32 h-0" />
            <div
              className={`relative border-t border-scheme-border bg-white pb-8 md:pb-14 lg:sticky lg:pb-0 ${STEP_META[i].sticky}`}
            >
              <div className="px-[5%]">
                <div className="container">
                  <div className="flex h-16 w-full items-center">
                    <span className="mr-5 text-medium font-semibold text-torea-bay md:mr-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-medium font-semibold">{item.step}</span>
                  </div>
                  <div className="py-8 md:py-10 lg:py-12">
                    <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
                      <div>
                        <h2 className="mb-5 text-h2 font-bold md:mb-6">
                          {item.heading}
                        </h2>
                        <p className="text-medium">{item.body}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                          <Button title={s.detailBtn} variant="secondary" asChild>
                            <Link href="/events">{s.detailBtn}</Link>
                          </Button>
                        </div>
                      </div>
                      <div className="img-zoom relative rounded-image">
                        <img
                          src={STEP_META[i].img}
                          className="h-[25rem] w-full rounded-image object-cover sm:h-[30rem] lg:h-[60vh]"
                          alt={STEP_META[i].alt}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
