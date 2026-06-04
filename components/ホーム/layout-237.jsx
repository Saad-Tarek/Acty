"use client";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const ICONS = [
  "/icons/directions_run.svg",
  "/icons/mindfulness.svg",
  "/icons/hiking.svg",
];

export function Layout237() {
  const { t } = useLocale();
  const s = t.home.experience;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <Kicker className="justify-center">{s.kicker}</Kicker>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
            <p className="text-medium">{s.lead}</p>
          </div>
          <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
            {s.features.map((f, i) => (
              <div
                key={f.title}
                className="group flex w-full flex-col items-center text-center"
              >
                <div className="mb-5 flex size-16 items-center justify-center rounded-card bg-burnt-sienna-lightest transition-transform duration-300 ease-out group-hover:-translate-y-1 md:mb-6">
                  <img className="size-9" src={ICONS[i]} alt="" aria-hidden="true" />
                </div>
                <h3 className="mb-5 text-h4 font-bold md:mb-6">{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
            <Button variant="secondary" title={s.ctaAll} asChild>
              <Link href="/events">{s.ctaAll}</Link>
            </Button>
            <Button
              iconRight={<ChevronRight className="text-scheme-text" />}
              variant="link"
              size="link"
              title={s.calendar}
              asChild
            >
              <Link href="/events">{s.calendar}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
