"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Cta2() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("有効なメールアドレスを入力してください。");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      // No backend yet: simulate the network round-trip.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setMessage("ご登録ありがとうございます。確認メールをお送りしました。");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(
        "登録に失敗しました。時間をおいて、もう一度お試しください。",
      );
    }
  };

  const isError = status === "error";
  const isSubmitting = status === "submitting";

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              最新イベント情報を受け取る
            </h2>
            <p className="text-medium">
              毎週のイベント情報と限定特典をメールでお届け
            </p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                className="mb-3 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="メールアドレスを入力"
                  aria-label="メールアドレス"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                  aria-invalid={isError}
                  aria-describedby="newsletter-status"
                  disabled={isSubmitting}
                />
                <Button title="登録" disabled={isSubmitting}>
                  {isSubmitting ? "登録中…" : "登録"}
                </Button>
              </form>
              <p
                id="newsletter-status"
                role={isError ? "alert" : "status"}
                aria-live="polite"
                className={
                  isError
                    ? "text-small font-medium text-burnt-sienna-dark"
                    : status === "success"
                      ? "text-small font-medium text-silver-tree-dark"
                      : "text-tiny"
                }
              >
                {message || (
                  <>
                    登録することで、
                    <a href="#" className="underline">
                      利用規約
                    </a>
                    に同意したものとみなされます。
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="img-zoom rounded-image">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000"
              className="aspect-[4/3] w-full rounded-image object-cover"
              alt="スタジオでのフィットネスクラスに参加するメンバー"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
