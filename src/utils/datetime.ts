export function getISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getLocalTime() {
  return new Date().toLocaleDateString();
}
