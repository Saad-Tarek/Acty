import React from "react";
import { BlogContent } from "@/components/blog/blog-content";

export const metadata = {
  title: "ブログ — Acty / Blog",
  description:
    "ウェルネス、コミュニティ、そしてイベントの舞台裏。Actyのブログは近日公開予定です。",
};

export default function Page() {
  return <BlogContent />;
}
