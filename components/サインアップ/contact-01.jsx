"use client";

import React from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { Kicker } from "@/components/ui/kicker";

export function Contact1() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container max-w-lg">
        <div className="mx-auto mb-10 w-full max-w-lg text-center md:mb-12">
          <Kicker className="justify-center">始める</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">アカウント作成</h2>
          <p className="text-medium">
            メールアドレスを入力するだけ。パスワードは不要です。Actyのウェルネスコミュニティに参加しましょう。
          </p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <AuthForm mode="signup" />
        </div>
      </div>
    </section>
  );
}
