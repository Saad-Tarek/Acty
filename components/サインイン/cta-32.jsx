"use client";

import React from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Cta32() {
  const { t } = useLocale();
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container flex flex-col items-center">
        <div className="mb-12 w-full max-w-sm text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{t.auth.signin.title}</h2>
          <p className="mb-6 text-medium md:mb-8">{t.auth.signin.lead}</p>
          <AuthForm mode="signin" />
        </div>
        <div className="img-zoom w-full rounded-image">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1800"
            className="aspect-[21/9] w-full rounded-image object-cover"
            alt="朝日のなかで静かに瞑想する人のシルエット"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
