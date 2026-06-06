import React from "react";
import { CookiesContent } from "@/components/legal/cookies-content";

export const metadata = {
  title: "クッキーポリシー — Acty / Cookie Policy",
  description:
    "Actyが利用するCookie（クッキー）の種類、目的、および管理方法について説明します。",
};

export default function Page() {
  return <CookiesContent />;
}
