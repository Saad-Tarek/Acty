"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocale } from "@/lib/i18n/locale-provider";
import { OrganizerDashboard } from "@/components/organizer/organizer-dashboard";

export default function Page() {
  const router = useRouter();
  const { user, loading, configured } = useAuth();
  const { t } = useLocale();

  useEffect(() => {
    if (!loading && configured && !user) router.replace("/signin");
  }, [loading, configured, user, router]);

  if (loading || (!user && configured)) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center scheme-1">
        <p className="text-medium">{t.organizer.loading}</p>
      </section>
    );
  }

  return <OrganizerDashboard />;
}
