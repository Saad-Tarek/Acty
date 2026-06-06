"use client";

import React from "react";
import { LegalPage } from "@/components/legal/legal-page";
import { useLocale } from "@/lib/i18n/locale-provider";

function CookiesJa() {
  return (
    <LegalPage
      title="クッキーポリシー"
      updated="2026年6月4日"
      lead="本ポリシーは、Acty（以下「当社」）がCookieおよびこれに類する技術をどのように利用するかを説明します。"
    >
      <h2>Cookieとは</h2>
      <p>
        Cookieとは、ウェブサイトを閲覧した際に、ブラウザを通じて利用者の端末に保存される小さなテキストファイルです。再訪問時の認識や設定の保持などに利用されます。
      </p>

      <h2>当社が利用するCookie</h2>
      <h3>必須Cookie</h3>
      <p>
        ログイン状態の保持やセキュリティの確保など、本サービスの基本的な機能の提供に不可欠なCookieです。これらは無効化できません。
      </p>
      <h3>分析Cookie</h3>
      <p>
        利用者がどのようにサービスを利用しているかを把握し、改善に役立てるためのCookieです。取得される情報は統計的に処理されます。
      </p>
      <h3>マーケティングCookie</h3>
      <p>
        関連性の高い情報やイベントをお届けするために利用されるCookieです。利用には事前の同意を前提とします。
      </p>

      <h2>Cookieの管理方法</h2>
      <p>
        利用者は、ブラウザの設定によりCookieの受け入れを拒否したり、保存されたCookieを削除したりすることができます。ただし、必須Cookieを無効化した場合、本サービスの一部が正常に動作しないことがあります。設定方法は、お使いのブラウザのヘルプをご確認ください。
      </p>

      <h2>本ポリシーの変更</h2>
      <p>
        当社は、必要に応じて本ポリシーを変更することがあります。変更後の内容は、本ページに掲示した時点から適用されます。
      </p>

      <h2>お問い合わせ</h2>
      <p>
        Cookieの利用に関するお問い合わせは、
        <a href="mailto:hello@acty.jp">hello@acty.jp</a>{" "}
        までご連絡ください。
      </p>
    </LegalPage>
  );
}

function CookiesEn() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="June 4, 2026"
      lead='This policy explains how Acty (the "Company") uses cookies and similar technologies.'
    >
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device via your browser when you visit a website. They are used to recognize you on return visits and to remember your settings.
      </p>

      <h2>Cookies We Use</h2>
      <h3>Essential Cookies</h3>
      <p>
        These cookies are indispensable for the basic functions of the Service, such as keeping you signed in and maintaining security. They cannot be disabled.
      </p>
      <h3>Analytics Cookies</h3>
      <p>
        These cookies help us understand how the Service is used so we can improve it. The information collected is processed statistically.
      </p>
      <h3>Marketing Cookies</h3>
      <p>
        These cookies are used to deliver information and events that are relevant to you. Their use is subject to your prior consent.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can refuse cookies or delete stored cookies through your browser settings. Note that disabling essential cookies may prevent parts of the Service from working properly. Please consult your browser's help pages for instructions.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy as needed. The updated policy applies from the moment it is posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        For inquiries about our use of cookies, please contact{" "}
        <a href="mailto:hello@acty.jp">hello@acty.jp</a>.
      </p>
    </LegalPage>
  );
}

export function CookiesContent() {
  const { locale } = useLocale();
  return locale === "en" ? <CookiesEn /> : <CookiesJa />;
}
