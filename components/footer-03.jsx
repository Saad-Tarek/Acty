"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "relume-icons";

const COL_ONE = [
  { label: "ホーム", href: "/" },
  { label: "イベント一覧", href: "/events" },
  { label: "イベント詳細", href: "/events/detail" },
  { label: "コミュニティ", href: "/community" },
  { label: "サインイン", href: "/signin" },
];
const COL_TWO = [
  { label: "サインアップ", href: "/signup" },
  { label: "プライバシー", href: "#" },
  { label: "利用規約", href: "#" },
  { label: "お問い合わせ", href: "#" },
  { label: "ブログ", href: "#" },
];
const SOCIAL = [
  { Icon: FacebookLogo, label: "Facebook" },
  { Icon: InstagramLogo, label: "Instagram" },
  { Icon: XLogo, label: "X", className: "p-0.5" },
  { Icon: LinkedinLogo, label: "LinkedIn" },
  { Icon: YoutubeLogo, label: "YouTube" },
];

export function Footer3() {
  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div>
            <div className="mb-6 md:mb-8">
              <Link href="/" aria-label="Acty ホーム">
                <Logo />
              </Link>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-small mb-1 font-semibold">住所</p>
              <p className="text-small mb-5 md:mb-6">
                〒150-0002 東京都渋谷区渋谷2-1-1
              </p>
              <p className="text-small mb-1 font-semibold">連絡先</p>
              <a href="tel:+81350000000" className="text-small block underline">
                03-5000-0000
              </a>
              <a
                href="mailto:hello@acty.jp"
                className="text-small block underline"
              >
                hello@acty.jp
              </a>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
              {SOCIAL.map(({ Icon, label, className }) => (
                <a key={label} href="#" aria-label={label}>
                  <Icon className={`size-6 text-scheme-text ${className ?? ""}`} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
            <ul>
              {COL_ONE.map((l) => (
                <li key={l.label} className="text-small py-2 font-semibold">
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {COL_TWO.map((l) => (
                <li key={l.label} className="text-small py-2 font-semibold">
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px w-full bg-scheme-border" />
        <div className="text-small flex flex-col-reverse items-start justify-between pt-6 pb-4 md:flex-row md:items-center md:pt-8 md:pb-0">
          <p className="mt-8 md:mt-0">© 2025 Acty. All rights reserved.</p>
          <ul className="text-small grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <a href="#">プライバシーポリシー</a>
            </li>
            <li className="underline">
              <a href="#">利用規約</a>
            </li>
            <li className="underline">
              <a href="#">クッキー設定</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
