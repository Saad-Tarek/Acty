"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/i18n/locale-provider";
import Link from "next/link";
import React, { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Cta2() {
  const { t } = useLocale();
  const s = t.home.cta02;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage(s.errInvalid);
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      // No backend yet: simulate the network round-trip.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setMessage(s.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(s.errFail);
    }
  };

  const isError = status === "error";
  const isSubmitting = status === "submitting";

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">{s.title}</h2>
            <p className="text-medium">{s.body}</p>
            <div className="mt-6 w-full max-w-sm md:mt-8">
              <form
                className="mb-3 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder={s.placeholder}
                  aria-label={t.auth.form.emailLabel}
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
                <Button title={s.submit} disabled={isSubmitting}>
                  {isSubmitting ? s.submitting : s.submit}
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
                    {s.termsPre}
                    <Link href="/terms" className="underline">
                      {s.termsLink}
                    </Link>
                    {s.termsPost}
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
