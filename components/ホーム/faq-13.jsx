"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";
import React from "react";

export function Faq13() {
  const { t } = useLocale();
  const s = t.home.faq;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
          <p className="text-medium">{s.lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-10 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {s.items.map((item) => (
            <div key={item.q}>
              <p className="mb-3 text-medium font-bold md:mb-4">{item.q}</p>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">{s.moreTitle}</h4>
          <p className="text-medium">{s.moreBody}</p>
          <div className="mt-6 md:mt-8">
            <Button title={s.contact} variant="secondary" asChild>
              <a href="mailto:hello@acty.jp">{s.contact}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
