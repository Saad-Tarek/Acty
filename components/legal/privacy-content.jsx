"use client";

import React from "react";
import { LegalPage } from "@/components/legal/legal-page";
import { useLocale } from "@/lib/i18n/locale-provider";

function PrivacyJa() {
  return (
    <LegalPage
      title="プライバシーポリシー"
      updated="2026年6月4日"
      lead="Acty（以下「当社」）は、利用者の個人情報を適切に取り扱うことを重要な責務と考え、以下のとおりプライバシーポリシーを定めます。"
    >
      <h2>1. 取得する情報</h2>
      <p>当社は、本サービスの提供にあたり、次の情報を取得します。</p>
      <ul>
        <li>氏名、メールアドレスなど、登録時にご提供いただく情報</li>
        <li>参加したイベント、キャンセル履歴などの利用履歴</li>
        <li>外部認証（Google、Apple、LINE等）を利用した場合、当該サービスから提供される識別情報</li>
        <li>Cookie、アクセスログ、端末情報などの技術的情報</li>
      </ul>

      <h2>2. 利用目的</h2>
      <p>取得した情報は、次の目的の範囲内で利用します。</p>
      <ul>
        <li>本サービスの提供、本人確認、イベント参加の管理のため</li>
        <li>イベントの確認・変更・キャンセル等に関する連絡のため</li>
        <li>ニュースレターやお知らせの配信のため（同意いただいた場合）</li>
        <li>サービスの改善、利用状況の分析のため</li>
        <li>お問い合わせへの対応のため</li>
      </ul>

      <h2>3. 第三者への提供</h2>
      <p>
        当社は、法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供しません。ただし、本サービスの運営に必要な範囲で、適切な契約のもとに業務委託先（メール配信、認証基盤、ホスティング等）へ情報を取り扱わせることがあります。
      </p>

      <h2>4. Cookie等の利用</h2>
      <p>
        本サービスは、利便性の向上や利用状況の把握のためにCookieおよび類似技術を利用します。詳細は
        <a href="/cookies">クッキーポリシー</a>
        をご確認ください。
      </p>

      <h2>5. 安全管理措置</h2>
      <p>
        当社は、個人情報の漏えい、滅失またはき損を防止するため、アクセス権限の管理や通信の暗号化など、適切な安全管理措置を講じます。
      </p>

      <h2>6. 開示・訂正・削除の請求</h2>
      <p>
        利用者は、自己の個人情報について、開示、訂正、利用停止または削除を請求することができます。ご請求は下記のお問い合わせ窓口までご連絡ください。本人確認のうえ、合理的な範囲で対応します。
      </p>

      <h2>7. お問い合わせ窓口</h2>
      <p>
        個人情報の取り扱いに関するお問い合わせは、
        <a href="mailto:hello@acty.jp">hello@acty.jp</a>{" "}
        までご連絡ください。
      </p>
    </LegalPage>
  );
}

function PrivacyEn() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 4, 2026"
      lead='Acty (the "Company") regards the proper handling of users&rsquo; personal information as an important responsibility and establishes this Privacy Policy as follows.'
    >
      <h2>1. Information We Collect</h2>
      <p>In providing the Service, we collect the following information:</p>
      <ul>
        <li>Information you provide at registration, such as your name and email address</li>
        <li>Usage history, such as events you have joined and cancellation history</li>
        <li>When you sign in with an external provider (Google, Apple, LINE, etc.), identifiers provided by that service</li>
        <li>Technical information such as cookies, access logs, and device information</li>
      </ul>

      <h2>2. How We Use It</h2>
      <p>We use the collected information only within the scope of the following purposes:</p>
      <ul>
        <li>To provide the Service, verify identity, and manage event participation</li>
        <li>To contact you about event confirmations, changes, and cancellations</li>
        <li>To send newsletters and announcements (where you have consented)</li>
        <li>To improve the Service and analyze usage</li>
        <li>To respond to inquiries</li>
      </ul>

      <h2>3. Sharing with Third Parties</h2>
      <p>
        We do not provide personal information to third parties without your consent, except as required by law. However, to the extent necessary to operate the Service, we may entrust information to service providers (email delivery, authentication infrastructure, hosting, etc.) under appropriate contracts.
      </p>

      <h2>4. Cookies and Similar Technologies</h2>
      <p>
        The Service uses cookies and similar technologies to improve convenience and understand usage. For details, please see our{" "}
        <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>5. Security Measures</h2>
      <p>
        To prevent leakage, loss, or damage of personal information, we implement appropriate safeguards such as access-permission management and encrypted communication.
      </p>

      <h2>6. Requests for Disclosure, Correction, or Deletion</h2>
      <p>
        You may request the disclosure, correction, suspension of use, or deletion of your personal information. Please contact us at the address below; after verifying your identity, we will respond within a reasonable scope.
      </p>

      <h2>7. Contact</h2>
      <p>
        For inquiries about the handling of personal information, please contact{" "}
        <a href="mailto:hello@acty.jp">hello@acty.jp</a>.
      </p>
    </LegalPage>
  );
}

export function PrivacyContent() {
  const { locale } = useLocale();
  return locale === "en" ? <PrivacyEn /> : <PrivacyJa />;
}
