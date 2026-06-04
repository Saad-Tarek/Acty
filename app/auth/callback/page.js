"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function Page() {
  const router = useRouter();
  const { t } = useLocale();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      router.replace("/");
      return;
    }

    // Surface a provider error if one came back in the URL.
    const params = new URLSearchParams(
      window.location.hash.slice(1) || window.location.search,
    );
    const desc = params.get("error_description");
    if (desc) setError(desc);

    // `detectSessionInUrl` exchanges the code/token automatically; wait for it.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace("/account");
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/account");
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-[5%] py-24 scheme-1">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-h4 font-bold">{t.auth.callback.failTitle}</h1>
            <p className="mt-3 text-medium">{error}</p>
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
