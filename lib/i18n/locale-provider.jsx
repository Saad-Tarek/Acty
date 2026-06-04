"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ja, en as enOverrides } from "./dictionary";

// English overrides Japanese; any key the English dictionary omits falls back to
// the Japanese value, so the site is never broken by a missing translation.
function deepMerge(base, override) {
  if (
    !base ||
    !override ||
    typeof base !== "object" ||
    typeof override !== "object"
  ) {
    return override ?? base;
  }
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(base[key], override[key]);
  }
  return out;
}

const dict = { ja, en: deepMerge(ja, enOverrides) };

const LocaleContext = createContext({
  locale: "ja",
  setLocale: () => {},
  t: ja,
});

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("ja");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("acty-locale");
      if (saved === "en" || saved === "ja") setLocale(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale;
  }, [locale]);

  const change = (next) => {
    setLocale(next);
    try {
      localStorage.setItem("acty-locale", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: change, t: dict[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
