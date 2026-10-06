import { Temporal } from "temporal-polyfill/implementation";

export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getFormattedDate(isoDate: string): string {
  const date = Temporal.PlainDate.from(isoDate);
  return date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getTodayISODate(): string {
  return Temporal.Now.plainDateISO().toString();
}

export function getYesterdayISODate(isoDate: string): string {
  const date = Temporal.PlainDate.from(isoDate);
  const yesterday = date.subtract({
    days: 1,
  });

  return yesterday.toString();
}

export function getTommorrowISODate(isoDate: string): string {
  const date = Temporal.PlainDate.from(isoDate);
  const yesterday = date.add({
    days: 1,
  });

  return yesterday.toString();
}
