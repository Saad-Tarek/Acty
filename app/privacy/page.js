import React from "react";
import { PrivacyContent } from "@/components/legal/privacy-content";

export const metadata = {
  title: "プライバシーポリシー — Acty / Privacy Policy",
  description:
    "Actyにおける個人情報の取得・利用・管理について定めたプライバシーポリシーです。",
};

export default function Page() {
  return <PrivacyContent />;
}
