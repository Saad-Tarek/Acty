import React from "react";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata = {
  title: "利用規約 — Acty / Terms of Service",
  description:
    "Actyのサービスをご利用いただく際の利用規約です。登録、イベント参加とキャンセル、禁止事項、免責事項などを定めています。",
};

export default function Page() {
  return <TermsContent />;
}
