import "./globals.css";
import { Navbar3 } from "@/components/navbar-03";
import { Footer3 } from "@/components/footer-03";
import { AuthProvider } from "@/components/auth/auth-provider";
import { LocaleProvider } from "@/lib/i18n/locale-provider";

const SITE_URL = "https://acty.btechjapan.com";
const SITE_DESCRIPTION =
  "Actyは、ランニング、ヨガ、瞑想、ハイキングまで、あなたの健康を高めるイベントとコミュニティを集めたプラットフォームです。プレミアムな体験と真のコミュニティを求める人たちのための場所。";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Acty — ウェルネスイベントとコミュニティ",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Acty",
    title: "Acty — ウェルネスイベントとコミュニティ",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "ja_JP",
    images: [{ url: "/logo/logo.jpg", width: 1264, height: 1264, alt: "Acty" }],
  },
  twitter: {
    card: "summary",
    title: "Acty — ウェルネスイベントとコミュニティ",
    description: SITE_DESCRIPTION,
    images: ["/logo/logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preload"
          href="/fonts/fraunces-700.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <LocaleProvider>
          <AuthProvider>
            <Navbar3 />
            {children}
            <Footer3 />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
