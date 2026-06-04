"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { useLocale } from "@/lib/i18n/locale-provider";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "relume-icons";

const SOCIAL = [
  { Icon: FacebookLogo, label: "Facebook" },
  { Icon: InstagramLogo, label: "Instagram" },
  { Icon: XLogo, label: "X", className: "p-0.5" },
  { Icon: LinkedinLogo, label: "LinkedIn" },
  { Icon: YoutubeLogo, label: "YouTube" },
];

export function Footer3() {
  const { t } = useLocale();

  const colOne = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.eventList, href: "/events" },
    { label: t.nav.eventDetail, href: "/event?slug=asa-no-run" },
    { label: t.nav.community, href: "/community" },
    { label: t.membership.title, href: "/membership" },
    { label: t.nav.login, href: "/signin" },
  ];
  const colTwo = [
    { label: t.nav.signup, href: "/signup" },
    { label: t.footer.careers, href: "/careers" },
    { label: t.footer.blog, href: "/blog" },
    { label: t.footer.contact, href: "mailto:hello@acty.jp" },
    { label: t.footer.privacy, href: "/privacy" },
    { label: t.footer.terms, href: "/terms" },
  ];

  return (
    <footer className="px-[5%] py-12 md:py-18 lg:py-20 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div>
            <div className="mb-6 md:mb-8">
              <Link href="/" aria-label="Acty">
                <Logo />
              </Link>
            </div>
            <div className="mb-6 md:mb-8">
              <p className="text-small mb-1 font-semibold">
                {t.footer.addressLabel}
              </p>
              <p className="text-small mb-5 md:mb-6">{t.footer.address}</p>
              <p className="text-small mb-1 font-semibold">
                {t.footer.contactLabel}
              </p>
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
              {colOne.map((l) => (
                <li key={l.href} className="text-small py-2 font-semibold">
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {colTwo.map((l) => (
                <li key={l.href} className="text-small py-2 font-semibold">
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px w-full bg-scheme-border" />
        <div className="text-small flex flex-col-reverse items-start justify-between pt-6 pb-4 md:flex-row md:items-center md:pt-8 md:pb-0">
          <p className="mt-8 md:mt-0">{t.footer.copyright}</p>
          <ul className="text-small grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li className="underline">
              <Link href="/privacy">{t.footer.privacyPolicy}</Link>
            </li>
            <li className="underline">
              <Link href="/terms">{t.footer.terms}</Link>
            </li>
            <li className="underline">
              <Link href="/cookies">{t.footer.cookies}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
