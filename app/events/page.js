"use client";

import React from "react";
import { Header64 } from "@/components/イベント一覧/header-64";
import { EventList } from "@/components/events/event-list";
import { Cta31 } from "@/components/ホーム/cta-31";

export default function Page() {
  return (
    <div>
      <Header64 />
      <EventList />
      <Cta31 />
    </div>
  );
}
