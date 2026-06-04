const TZ = "Asia/Tokyo";

/** Date pieces for an event's start, for compact badges/labels. */
export function eventDateParts(iso, locale = "ja") {
  if (!iso) return { weekday: "", day: "", month: "", full: "", time: "" };
  const lc = locale === "en" ? "en-US" : "ja-JP";
  const part = (options) =>
    new Intl.DateTimeFormat(lc, { timeZone: TZ, ...options }).format(
      new Date(iso),
    );
  return {
    weekday: part({ weekday: "short" }),
    day: part({ day: "numeric" }),
    month: part({ month: "long" }),
    full: part({ month: "long", day: "numeric", weekday: "short" }),
    time: part({ hour: "2-digit", minute: "2-digit" }),
  };
}

/** Remaining-seats label from an event_summaries row, using a dict's seats section. */
export function seatsLabel(ev, seats) {
  if (ev?.capacity == null) return seats.unlimited;
  const left = ev.capacity - (ev.confirmed_count ?? 0);
  return left > 0 ? seats.left(left) : seats.full;
}

/** Remaining seats as a number (null = unlimited). */
export function seatsLeft(ev) {
  if (ev?.capacity == null) return null;
  return Math.max(0, ev.capacity - (ev.confirmed_count ?? 0));
}
