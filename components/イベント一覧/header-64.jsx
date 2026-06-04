"use client";

import React from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Header64() {
  const { t } = useLocale();
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container max-w-lg text-center">
        <h1 className="mb-5 text-h1 font-bold md:mb-6">
          {t.eventsPage.header.title}
        </h1>
        <p className="text-medium">{t.eventsPage.header.lead}</p>
      </div>
    </section>
  );
}
