"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleDropdownMenu = () => setIsDropdownOpen((prev) => !prev);
  const openDropdownOnHover = () => !isMobile && setIsDropdownOpen(true);
  const closeDropdownOnLeave = () => !isMobile && setIsDropdownOpen(false);

  const animateMobileMenu = isMobileMenuOpen ? "open" : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownIcon = isDropdownOpen ? "rotated" : "initial";

  return {
    isMobileMenuOpen,
    isDropdownOpen,
    toggleMobileMenu,
    toggleDropdownMenu,
    openDropdownOnHover,
    closeDropdownOnLeave,
    animateMobileMenu,
    animateDropdownMenu,
    animateDropdownIcon,
  };
};

const NAV_LINK = "relative block py-3 text-base lg:px-4 lg:py-2";
const DROPDOWN_LINK =
  "block py-3 pl-[5%] text-base lg:py-2 lg:pr-8 lg:pl-4 lg:text-left";

export function Navbar3() {
  const useActive = useRelume();
  return (
    <section className="z-sticky grid w-full grid-cols-[1fr_max-content_1fr] items-center justify-between bg-scheme-background px-[5%] md:min-h-18 scheme-1">
      <button
        className="flex size-12 flex-col justify-center lg:hidden"
        onClick={useActive.toggleMobileMenu}
        aria-label="メニューを開く"
        aria-expanded={useActive.isMobileMenuOpen}
      >
        <span className="my-[3px] h-0.5 w-6 bg-scheme-text lg:hidden" />
        <span className="my-[3px] h-0.5 w-6 bg-scheme-text lg:hidden" />
        <span className="my-[3px] h-0.5 w-6 bg-scheme-text lg:hidden" />
      </button>
      <motion.div
        initial="closed"
        animate={useActive.animateMobileMenu}
        exit="closed"
        variants={{
          closed: {
            x: "-100%",
            opacity: 1,
            transition: { type: "spring", duration: 0.6, bounce: 0 },
            transitionEnd: {
              opacity: "var(--opacity-closed, 0%)",
              x: "var(--x-closed, -100%)",
            },
          },
          open: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", duration: 0.4, bounce: 0 },
          },
        }}
        className="absolute top-0 left-0 z-modal flex h-dvh w-[90%] flex-col border-r border-scheme-border bg-scheme-background px-[5%] pb-4 md:w-[80%] lg:visible lg:static lg:-ml-4 lg:flex lg:h-auto lg:w-auto lg:flex-row lg:border-none lg:px-0 lg:pb-0 lg:[--opacity-closed:100%] lg:[--x-closed:0%]"
      >
        <Link
          href="/"
          className="mt-10 mb-8 flex shrink-0 lg:hidden"
          aria-label="Acty ホーム"
        >
          <Logo />
        </Link>
        <Link href="/" className={NAV_LINK}>
          ホーム
        </Link>
        <Link href="/events" className={NAV_LINK}>
          イベント
        </Link>
        <div
          onMouseEnter={useActive.openDropdownOnHover}
          onMouseLeave={useActive.closeDropdownOnLeave}
        >
          <p
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={useActive.isDropdownOpen}
            className="flex w-full items-center justify-between gap-2 py-3 text-base lg:flex-none lg:justify-start lg:px-4 lg:py-2"
            onClick={useActive.toggleDropdownMenu}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                useActive.toggleDropdownMenu();
              }
            }}
          >
            コミュニティ
            <motion.span
              variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
              animate={useActive.animateDropdownIcon}
              transition={{ duration: 0.3 }}
            >
              <KeyboardArrowDown className="text-scheme-text" />
            </motion.span>
          </p>
          <ConditionalRender condition={useActive.isDropdownOpen}>
            <motion.div
              variants={{
                open: {
                  visibility: "visible",
                  opacity: "var(--opacity-open, 100%)",
                  y: 0,
                },
                close: {
                  visibility: "hidden",
                  opacity: "var(--opacity-close, 0)",
                  y: "var(--y-close, 0%)",
                },
              }}
              initial="close"
              exit="close"
              animate={useActive.animateDropdownMenu}
              className="bg-scheme-background lg:absolute lg:z-dropdown lg:rounded-card lg:border lg:border-scheme-border lg:p-2 lg:shadow-lg lg:[--y-close:25%]"
            >
              <Link href="/community" className={DROPDOWN_LINK}>
                コミュニティ
              </Link>
              <Link href="/events" className={DROPDOWN_LINK}>
                イベント一覧
              </Link>
              <Link href="/events/detail" className={DROPDOWN_LINK}>
                イベント詳細
              </Link>
            </motion.div>
          </ConditionalRender>
        </div>
        <Button className="mt-6 w-full lg:hidden" title="新規登録" size="sm" asChild>
          <Link href="/signup">新規登録</Link>
        </Button>
      </motion.div>
      <ConditionalRender condition={useActive.isMobileMenuOpen}>
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-modal-backdrop bg-scheme-text lg:hidden"
          onClick={useActive.toggleMobileMenu}
        />
      </ConditionalRender>
      <Link
        href="/"
        className="flex min-h-16 shrink-0 items-center"
        aria-label="Acty ホーム"
      >
        <Logo />
      </Link>
      <div className="flex min-h-16 items-center justify-end gap-x-4">
        <Button
          title="ログイン"
          size="sm"
          className="px-4 py-1 md:px-6 md:py-2"
          asChild
        >
          <Link href="/signin">ログイン</Link>
        </Button>
      </div>
    </section>
  );
}
