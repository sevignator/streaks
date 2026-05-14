export function getISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getZonedDate(isoDate: string, timezone: string) {
  return getZonedDate(isoDate, timezone);
}
