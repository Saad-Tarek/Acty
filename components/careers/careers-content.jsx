"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";

export function CareersContent() {
  const { t } = useLocale();
  const s = t.careers;
  return (
    <div>
      <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
        <div className="container max-w-3xl text-center">
          <Kicker className="justify-center">{s.kicker}</Kicker>
          <h1 className="mb-5 text-h1 font-bold md:mb-6">{s.title}</h1>
          <p className="text-medium">{s.lead}</p>
        </div>
      </section>

      <section className="px-[5%] py-12 md:py-16 lg:py-20 scheme-2">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
            {s.values.map((v) => (
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
          <h2 className="mb-8 text-h3 font-bold md:mb-10">{s.rolesTitle}</h2>
          <div className="flex flex-col">
            {s.roles.map((r, i) => (
              <div
                key={r.title}
                className={
                  "flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between md:py-8 " +
                  (i > 0 ? "border-t border-scheme-border" : "")
                }
              >
                <div>
                  <h3 className="text-h5 font-bold">{r.title}</h3>
                  <p className="mt-1 text-small text-neutral-darkest/70">{r.type}</p>
                  <p className="mt-3 max-w-xl">{r.body}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  title={s.apply}
                  className="shrink-0 self-start sm:self-center"
                  asChild
                >
                  <a
                    href={`mailto:careers@acty.jp?subject=${encodeURIComponent(
                      r.title,
                    )}`}
                  >
                    {s.apply}
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-card bg-neutral-darkest-5 p-8 text-center md:mt-20 md:p-12">
            <h3 className="mb-3 text-h4 font-bold">{s.noRoleTitle}</h3>
            <p className="mx-auto mb-6 max-w-md text-medium">{s.noRoleBody}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button title={s.casual} asChild>
                <a href="mailto:careers@acty.jp">{s.casual}</a>
              </Button>
              <Button variant="secondary" title={s.seeEvents} asChild>
                <Link href="/events">{s.seeEvents}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
