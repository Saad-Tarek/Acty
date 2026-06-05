"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-provider";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function Page() {
  const router = useRouter();
  const { t } = useLocale();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      router.replace("/");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    let saved = null;
    try {
      saved = sessionStorage.getItem("acty-line-state");
    } catch {
      /* ignore */
    }
    if (params.get("error")) {
      setError(params.get("error_description") || params.get("error"));
      return;
    }
    if (!code || !state || state !== saved) {
      setError("invalid_state");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${SB_URL}/functions/v1/line-auth`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            apikey: SB_KEY,
            Authorization: `Bearer ${SB_KEY}`,
          },
          body: JSON.stringify({
            code,
            redirectUri: `${window.location.origin}/auth/line`,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.error || !data.token_hash) {
          setError(data.error || "line_error");
          return;
        }
        const { error: vErr } = await supabase.auth.verifyOtp({
          token_hash: data.token_hash,
          type: "magiclink",
        });
        if (vErr) {
          setError(vErr.message);
          return;
        }
        try {
          sessionStorage.removeItem("acty-line-state");
        } catch {
          /* ignore */
        }
        router.replace("/account");
      } catch {
        setError("network");
      }
    })();
  }, [router]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-[5%] py-24 scheme-1">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-h4 font-bold">{t.auth.callback.failTitle}</h1>
            <a href="/signin" className="mt-4 inline-block underline">
              {t.auth.callback.failRetry}
            </a>
          </>
        ) : (
          <p className="text-medium">{t.auth.callback.signingIn}</p>
        )}
      </div>
    </section>
  );
}
