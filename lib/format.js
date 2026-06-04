const TZ = "Asia/Tokyo";

const part = (iso, options) =>
  new Intl.DateTimeFormat("ja-JP", { timeZone: TZ, ...options }).format(
    new Date(iso),
  );

/** Date pieces for an event's start, for compact badges/labels. */
export function eventDateParts(iso) {
  if (!iso) return { weekday: "", day: "", month: "", full: "", time: "" };
  return {
    weekday: part(iso, { weekday: "short" }),
    day: part(iso, { day: "numeric" }),
    month: part(iso, { month: "long" }),
    full: part(iso, { month: "long", day: "numeric", weekday: "short" }),
    time: part(iso, { hour: "2-digit", minute: "2-digit" }),
  };
}

/** Remaining-seats label from an event_summaries row. */
export function seatsLabel(ev) {
  if (ev?.capacity == null) return "定員なし";
  const left = ev.capacity - (ev.confirmed_count ?? 0);
  if (left > 0) return `残り${left}名`;
  return "満席・キャンセル待ち受付中";
}

/** Remaining seats as a number (null = unlimited). */
export function seatsLeft(ev) {
  if (ev?.capacity == null) return null;
  return Math.max(0, ev.capacity - (ev.confirmed_count ?? 0));
}
