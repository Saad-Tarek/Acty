"use client";

import React from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Kicker } from "@/components/ui/kicker";
import { useLocale } from "@/lib/i18n/locale-provider";

export function Contact1() {
  const { t } = useLocale();
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container max-w-lg">
        <div className="mx-auto mb-10 w-full max-w-lg text-center md:mb-12">
          <Kicker className="justify-center">{t.auth.signup.kicker}</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">{t.auth.signup.title}</h2>
          <p className="text-medium">{t.auth.signup.lead}</p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <AuthForm mode="signup" />
        </div>
      </div>
    </section>
  );
}
