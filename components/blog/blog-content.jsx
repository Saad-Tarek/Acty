"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";

export function BlogContent() {
  const { t } = useLocale();
  const s = t.blog;
  return (
    <section className="px-[5%] py-24 md:py-32 lg:py-40 scheme-1">
      <div className="container max-w-2xl text-center">
        <Kicker className="justify-center">{s.kicker}</Kicker>
        <h1 className="mb-5 text-h1 font-bold md:mb-6">{s.title}</h1>
        <p className="text-medium">{s.lead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:mt-10">
          <Button title={s.events} asChild>
            <Link href="/events">{s.events}</Link>
          </Button>
          <Button variant="secondary" title={s.community} asChild>
            <Link href="/community">{s.community}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
