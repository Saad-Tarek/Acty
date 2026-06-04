"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GoogleGlyph() {
  return (
    <svg className="size-5" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

/**
 * Passwordless auth: a magic-link email plus "continue with Google".
 * Sign-up and sign-in converge (a magic link creates the account if needed);
 * only the copy and the optional name field differ.
 * @param {{ mode?: "signin" | "signup" }} props
 */
export function AuthForm({ mode = "signin" }) {
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  const notConfigured = () => {
    setError("認証は現在準備中です。少々お待ちください。");
    setStatus("error");
  };

  const sendMagicLink = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return notConfigured();
    if (!EMAIL_RE.test(email.trim())) {
      setError("有効なメールアドレスを入力してください。");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
        data: isSignup && name.trim() ? { name: name.trim() } : undefined,
      },
    });
    if (err) {
      setError("送信に失敗しました。時間をおいて、もう一度お試しください。");
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  const continueWithGoogle = async () => {
    if (!isSupabaseConfigured) return notConfigured();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (err) {
      setError("Googleでのサインインに失敗しました。");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-card bg-neutral-darkest-5 p-6 text-center md:p-8">
        <p className="text-large font-bold">メールを確認してください</p>
        <p className="mt-2 text-medium">
          <span className="font-semibold">{email}</span>{" "}
          宛にサインイン用のリンクをお送りしました。メール内のリンクを開くと、サインインが完了します。
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          <Button
            asChild
            title="Gmailを開く"
            iconLeft={<GoogleGlyph />}
          >
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gmailを開く
            </a>
          </Button>
          <button
            type="button"
            className="text-small underline"
            onClick={() => {
              setStatus("idle");
              setError("");
            }}
          >
            別のメールアドレスを使う
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <div className="grid grid-cols-1 gap-4 text-left">
      <form className="grid grid-cols-1 gap-4" onSubmit={sendMagicLink} noValidate>
        {isSignup && (
          <div className="grid gap-2">
            <Label htmlFor="auth-name">氏名（任意）</Label>
            <Input
              id="auth-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={sending}
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="auth-email">メールアドレス</Label>
          <Input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby="auth-status"
            disabled={sending}
          />
        </div>
        <Button type="submit" className="w-full" disabled={sending} title="リンクを送信">
          {sending ? "送信中…" : "サインインリンクを送信"}
        </Button>
      </form>

      <div className="flex items-center gap-4 text-small text-neutral-darkest/60">
        <span className="h-px flex-1 bg-scheme-border" />
        または
        <span className="h-px flex-1 bg-scheme-border" />
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={continueWithGoogle}
        title="Googleで続ける"
        iconLeft={<GoogleGlyph />}
      >
        Googleで続ける
      </Button>

      <p
        id="auth-status"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={
          status === "error"
            ? "text-small font-medium text-burnt-sienna-dark"
            : "text-tiny"
        }
      >
        {status === "error"
          ? error
          : isSignup
            ? "パスワードは不要です。リンクをクリックするだけでサインインできます。"
            : "登録済みのメールアドレスにリンクをお送りします。"}
      </p>

      {isSignup ? (
        <p className="text-small">
          続行することで、
          <Link href="/terms" className="underline">
            利用規約
          </Link>
          に同意したものとみなされます。すでにアカウントをお持ちですか?{" "}
          <Link href="/signin" className="font-medium underline">
            サインイン
          </Link>
        </p>
      ) : (
        <p className="text-small">
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="font-medium underline">
            新規登録
          </Link>
        </p>
      )}
    </div>
  );
}
