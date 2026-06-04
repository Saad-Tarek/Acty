"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Kicker } from "@/components/ui/kicker";
import Link from "next/link";
import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact1() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return fail("お名前を入力してください。");
    if (!EMAIL_RE.test(form.email.trim()))
      return fail("有効なメールアドレスを入力してください。");
    if (form.password.length < 8)
      return fail("パスワードは8文字以上で設定してください。");
    if (form.password !== form.confirm)
      return fail("パスワードが一致しません。");
    if (!form.terms) return fail("利用規約への同意が必要です。");
    setError("");
    setStatus("success");
  };

  const fail = (msg) => {
    setError(msg);
    setStatus("error");
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container max-w-lg">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <Kicker className="justify-center">始める</Kicker>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">アカウント作成</h2>
          <p className="text-medium">
            基本情報を入力して、Actyのウェルネスコミュニティに参加しましょう。
          </p>
        </div>
        <form
          className="mx-auto grid w-full max-w-md grid-cols-1 gap-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="signup-name">氏名</Label>
            <Input
              type="text"
              id="signup-name"
              value={form.name}
              onChange={update("name")}
              autoComplete="name"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="signup-email">メールアドレス</Label>
            <Input
              type="email"
              id="signup-email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="signup-password">パスワード</Label>
            <Input
              type="password"
              id="signup-password"
              placeholder="8文字以上"
              value={form.password}
              onChange={update("password")}
              autoComplete="new-password"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="signup-confirm">パスワード（確認）</Label>
            <Input
              type="password"
              id="signup-confirm"
              placeholder="もう一度入力してください"
              value={form.confirm}
              onChange={update("confirm")}
              autoComplete="new-password"
            />
          </div>
          <div className="flex items-center space-x-2 text-small">
            <Checkbox
              id="signup-terms"
              checked={form.terms}
              onCheckedChange={(v) => {
                setForm((f) => ({ ...f, terms: v === true }));
                if (status !== "idle") setStatus("idle");
              }}
            />
            <Label htmlFor="signup-terms" className="cursor-pointer">
              <Link href="/terms" className="underline">
                利用規約
              </Link>
              に同意します
            </Label>
          </div>
          <div className="grid gap-3 text-center">
            <Button title="登録" className="w-full">
              無料で登録する
            </Button>
            <p
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
                ? error
                : status === "success"
                  ? "ご登録ありがとうございます。確認メールをお送りしました。"
                  : "登録は無料です。いつでも退会できます。"}
            </p>
            <p className="text-small">
              すでにアカウントをお持ちですか?{" "}
              <Link href="/signin" className="font-medium underline">
                サインイン
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
