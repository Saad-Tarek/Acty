"use client";

import React from "react";
import { Header64 } from "@/components/サインイン/header-64";
import { Cta32 } from "@/components/サインイン/cta-32";
import { Cta31 } from "@/components/ホーム/cta-31";

export default function Page() {
  return (
    <div>
      <Header64 />
      <Cta32 />
      <Cta31 />
    </div>
  );
}
