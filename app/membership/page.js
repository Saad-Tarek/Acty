"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { getMyTierSlug } from "@/lib/supabase/membership";

function Check({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.5l4 4 8-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Page() {
  const { user } = useAuth();
  const { t } = useLocale();
  const m = t.membership;
  const [tier, setTier] = useState(null);

  useEffect(() => {
    if (!user) return;
    getMyTierSlug()
      .then(setTier)
      .catch(() => setTier("free"));
  }, [user]);

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container max-w-4xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-16">
          <h1 className="mb-5 text-h1 font-bold md:mb-6">{m.title}</h1>
          <p className="text-medium">{m.lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {m.tiers.map((tierItem) => {
            const isCurrent = tier === tierItem.slug;
            const isPremium = tierItem.slug === "premium";
            return (
              <div
                key={tierItem.slug}
                className={
                  "flex flex-col rounded-card border p-6 md:p-8 " +
                  (isPremium
                    ? "border-torea-bay bg-torea-bay-lightest"
                    : "border-scheme-border")
                }
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-h4 font-bold">{tierItem.name}</h2>
                  {isCurrent && (
                    <span className="rounded-button bg-silver-tree-lightest px-3 py-1 text-tiny font-semibold text-silver-tree-darker">
                      {m.currentPlan}
                    </span>
                  )}
                </div>
                <p className="mt-4 mb-6">
                  <span className="text-h2 font-bold">{tierItem.price}</span>
                  <span className="text-medium text-neutral-darkest/70">
                    {tierItem.per}
                  </span>
                </p>
                <p className="mb-3 text-small font-semibold text-neutral-darkest/70">
                  {m.perksLabel}
                </p>
                <ul className="mb-8 flex flex-col gap-3">
                  {tierItem.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-5 shrink-0 text-torea-bay" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                {isPremium && (
                  <div className="mt-auto">
                    <Button className="w-full" disabled title={tierItem.cta}>
                      {tierItem.cta}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-small text-neutral-darkest/60">
          {m.comingSoon}
        </p>
      </div>
    </section>
  );
}
