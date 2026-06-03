"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { ChevronLeft } from "relume-icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTDOWN = [
  { value: "45", unit: "日" },
  { value: "12", unit: "時間" },
  { value: "44", unit: "分" },
  { value: "29", unit: "秒" },
];

export function EventItemHeader1() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-20 gap-y-12 md:grid-flow-row md:gap-y-16 lg:grid-cols-2 lg:gap-y-12">
          <div className="flex flex-col items-start">
            <Button
              title="すべてのイベント"
              variant="link"
              size="link"
              iconLeft={<ChevronLeft className="text-scheme-text" />}
              asChild
            >
              <a href="#">すべてのイベント</a>
            </Button>
            <h1 className="mt-6 text-h2 font-bold md:mt-8">
              朝日の中でのランニングクラブ
            </h1>
            <p className="mt-5 text-medium md:mt-6">
              東京の公園で開催される、心身ともにリフレッシュできるランニングイベント。初心者から経験者まで、自分のペースで参加できます。
            </p>
            <div className="mt-5 flex items-center gap-4 md:mt-6">
              <div className="text-medium font-semibold">土曜日 2月10日</div>
              <Badge>残り10名</Badge>
            </div>
            <Card className="mt-8 flex flex-wrap justify-center gap-4 px-4 py-4 sm:flex-nowrap sm:px-6">
              {COUNTDOWN.map((c, i) => (
                <React.Fragment key={c.unit}>
                  {i > 0 && (
                    <div className="hidden w-px self-stretch bg-scheme-border sm:block" />
                  )}
                  <div className="flex min-w-18 flex-col items-center">
                    <span className="text-h3 font-bold">{c.value}</span>
                    <span>{c.unit}</span>
                  </div>
                </React.Fragment>
              ))}
            </Card>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                className="mb-3 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <Input
                  id="join-email"
                  type="email"
                  placeholder="メールアドレスを入力"
                  aria-label="メールアドレス"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                  aria-describedby="join-status"
                />
                <Button title="参加を確定">参加を確定</Button>
              </form>
              <p
                id="join-status"
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
                  ? "有効なメールアドレスを入力してください。"
                  : status === "success"
                    ? "参加を受け付けました。確認メールをお送りします。"
                    : "参加を確定することで、利用規約に同意したことになります。"}
              </p>
            </div>
          </div>
          <div className="img-zoom w-full rounded-image">
            <div className="relative aspect-square">
              <img
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=1200"
                className="size-full rounded-image object-cover"
                alt="早朝の公園を走るランニングクラブの参加者たち"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
