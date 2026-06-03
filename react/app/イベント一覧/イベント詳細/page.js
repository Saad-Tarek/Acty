"use client"

import React from "react";
import { EventItemHeader1 } from "@/components/イベント詳細/event-item-header-01";
import { Content32 } from "@/components/イベント詳細/content-32";
import { Stats24 } from "@/components/イベント詳細/stats-24";
import { Testimonial6 } from "@/components/イベント詳細/testimonial-06";
import { Cta31 } from "@/components/イベント詳細/cta-31";
import { Faq13 } from "@/components/イベント詳細/faq-13";


export default function Page() {
  return (
    <div>
      <EventItemHeader1 />
      <Content32 />
      <Stats24 />
      <Testimonial6 />
      <Cta31 />
      <Faq13 />
    </div>
  );
}
