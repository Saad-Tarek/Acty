"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-provider";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINE_CHANNEL_ID = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;

function GoogleGlyph() {
  return (
    <svg className="size-5" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}

function LineGlyph() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 4 3.6 7.3 8.4 7.9.3.07.8.22.9.5.1.26.06.66.03.92l-.14.86c-.04.26-.2 1 .9.55s5.9-3.5 8.05-5.98C21.6 14.6 22 12.9 22 11c0-4.4-4.5-8-10-8Z" />
    </svg>
  );
}

/**
 * Passwordless auth: a magic-link email plus "continue with Google" / LINE.
 * @param {{ mode?: "signin" | "signup" }} props
 */
export function AuthForm({ mode = "signin" }) {
  const { t } = useLocale();
  const f = t.auth.form;
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
    setError(f.notConfigured);
    setStatus("error");
  };

  const sendMagicLink = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return notConfigured();
    if (!EMAIL_RE.test(email.trim())) {
      setError(f.errInvalid);
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
      setError(f.errSend);
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
      setError(f.errGoogle);
      setStatus("error");
    }
  };

  const continueWithLine = () => {
    if (!LINE_CHANNEL_ID) return;
    const state = crypto.randomUUID();
    try {
      sessionStorage.setItem("acty-line-state", state);
    } catch {
      /* ignore */
    }
    const redirectUri = `${window.location.origin}/auth/line`;
    window.location.href =
      "https://access.line.me/oauth2/v2.1/authorize?response_type=code" +
      `&client_id=${LINE_CHANNEL_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}` +
      `&scope=${encodeURIComponent("profile openid")}` +
      "&bot_prompt=normal";
  };

  if (status === "sent") {
    return (
      <div className="rounded-card bg-neutral-darkest-5 p-6 text-center md:p-8">
        <p className="text-large font-bold">{f.sentTitle}</p>
        <p className="mt-2 text-medium">
          <span className="font-semibold">{email}</span>
          {f.sentBody1}
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          <Button asChild title={f.openGmail} iconLeft={<GoogleGlyph />}>
            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              {f.openGmail}
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
            {f.useAnother}
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
            <Label htmlFor="auth-name">{f.nameLabel}</Label>
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
          <Label htmlFor="auth-email">{f.emailLabel}</Label>
          <Input
            id="auth-email"
            type="email"
            placeholder={f.emailPlaceholder}
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
        <Button type="submit" className="w-full" disabled={sending} title={f.send}>
          {sending ? f.sending : f.send}
        </Button>
      </form>

      <div className="flex items-center gap-4 text-small text-neutral-darkest/60">
        <span className="h-px flex-1 bg-scheme-border" />
        {f.or}
        <span className="h-px flex-1 bg-scheme-border" />
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={continueWithGoogle}
        title={f.google}
        iconLeft={<GoogleGlyph />}
      >
        {f.google}
      </Button>

      {LINE_CHANNEL_ID && (
        <button
          type="button"
          onClick={continueWithLine}
          title={f.line}
          className="inline-flex w-full items-center justify-center gap-3 rounded-button bg-[#06C755] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
        >
          <LineGlyph />
          {f.line}
        </button>
      )}

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
        {status === "error" ? error : isSignup ? f.signupHelper : f.signinHelper}
      </p>

      {isSignup ? (
        <p className="text-small">
          {f.termsPre}
          <Link href="/terms" className="underline">
            {f.termsLink}
          </Link>
          {f.termsPost} {f.haveAccount}{" "}
          <Link href="/signin" className="font-medium underline">
            {f.signinCross}
          </Link>
        </p>
      ) : (
        <p className="text-small">
          {f.noAccount}{" "}
          <Link href="/signup" className="font-medium underline">
            {f.signupCross}
          </Link>
        </p>
      )}
    </div>
  );
}
