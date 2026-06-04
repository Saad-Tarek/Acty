"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "relume-icons";

const ICONS = [
  "/icons/directions_run.svg",
  "/icons/mindfulness.svg",
  "/icons/self_improvement.svg",
];

export function Layout551() {
  const { t } = useLocale();
  const s = t.community.leaders;
  return (
    <section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0 scheme-1">
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-20 lg:ml-[5vw] lg:justify-self-end">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2">
          {s.items.map((l, i) => (
            <div key={l.title} className="group flex self-start">
              <div className="mr-6 flex-none self-start">
                <img
                  className="size-12 transition-transform duration-300 ease-out group-hover:-translate-y-1"
                  src={ICONS[i]}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="mb-3 text-h5 font-bold md:mb-4">{l.title}</h3>
                <p>{l.body}</p>
                <div className="mt-5 flex items-center gap-4 md:mt-6">
                  <Button
                    title={s.introBtn}
                    variant="link"
                    size="link"
                    iconRight={<ChevronRight className="text-scheme-text" />}
                    asChild
                  >
                    <Link href="/events">{s.introBtn}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="img-zoom relative size-full overflow-hidden lg:min-h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1400"
          alt="夕暮れに肩を組んで景色を眺めるコミュニティの仲間たち"
          className="static size-full object-cover lg:absolute lg:inset-0"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
