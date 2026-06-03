import "./globals.css";
import { Navbar3 } from "@/components/navbar-03";
import { Footer3 } from "@/components/footer-03";

export const metadata = {
  title: "Acty — ウェルネスイベントとコミュニティ",
  description:
    "Actyは、ランニング、ヨガ、瞑想、ハイキングまで、あなたの健康を高めるイベントとコミュニティを集めたプラットフォームです。プレミアムな体験と真のコミュニティを求める人たちのための場所。",
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
        <Navbar3 />
        {children}
        <Footer3 />
      </body>
    </html>
  );
}
