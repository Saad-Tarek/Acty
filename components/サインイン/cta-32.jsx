"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Cta32() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(form.email.trim()) || form.password.length < 8) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container flex flex-col items-center">
        <div className="mb-12 w-full max-w-sm text-center md:mb-18 lg:mb-20">
          <h2 className="mb-5 text-h2 font-bold md:mb-6">サインインする</h2>
          <p className="text-medium">
            メールアドレスとパスワードを入力して、あなたのウェルネスジャーニーを続けよう。
          </p>
          <form
            className="mt-6 grid grid-cols-1 gap-4 text-left md:mt-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="signin-email">メールアドレス</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update("email")}
                aria-invalid={status === "error"}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="signin-password">パスワード</Label>
                <a href="#" className="text-small underline">
                  パスワードをお忘れですか?
                </a>
              </div>
              <Input
                id="signin-password"
                type="password"
                placeholder="8文字以上"
                value={form.password}
                onChange={update("password")}
                aria-invalid={status === "error"}
                aria-describedby="signin-status"
                autoComplete="current-password"
              />
            </div>
            <Button title="サインイン" className="w-full">
              サインイン
            </Button>
            <p
              id="signin-status"
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={
                status === "error"
                  ? "text-small font-medium text-burnt-sienna-dark"
                  : status === "success"
                    ? "text-small font-medium text-silver-tree-dark"
                    : "text-tiny"
              }
            >
              {status === "error"
                ? "メールアドレスと8文字以上のパスワードを入力してください。"
                : status === "success"
                  ? "サインインしました。ようこそ戻ってきました。"
                  : "メールアドレスとパスワードを入力してください。"}
            </p>
            <p className="text-small">
              アカウントをお持ちでない方は{" "}
              <Link href="/signup" className="font-medium underline">
                新規登録
              </Link>
            </p>
          </form>
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
