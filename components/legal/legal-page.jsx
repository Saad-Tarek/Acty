"use client";

import React from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

/**
 * Shared shell for long-form legal / policy pages: a title, an optional
 * "last updated" line, and a typographic prose body.
 * @param {{ title: string, updated?: string, lead?: string, children: React.ReactNode }} props
 */
export function LegalPage({ title, updated, lead, children }) {
  const { locale } = useLocale();
  return (
    <article className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container max-w-3xl">
        <header className="mb-10 border-b border-scheme-border pb-8 md:mb-12">
          <h1 className="text-h2 font-bold">{title}</h1>
          {lead && <p className="mt-4 text-medium">{lead}</p>}
          {updated && (
            <p className="mt-4 text-small text-neutral-darkest/60">
              {locale === "en" ? "Last updated:" : "最終更新日:"} {updated}
            </p>
          )}
        </header>
        <div className="prose-base max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-h4 prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-large prose-p:mb-4 prose-p:leading-[1.8] prose-li:my-1 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-5 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-5 prose-a:font-medium prose-a:underline prose-strong:font-bold">
          {children}
        </div>
      </div>
    </article>
  );
}
