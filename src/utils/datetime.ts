export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getFormattedDate(date: Date, timeZone: string) {
  return Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    timeZone,
  }).format(date);
}

export function getISODateWithTimezone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to format ISO date for timezone");
  }

  return `${year}-${month}-${day}`;
}

function getPreviousISODate(isoDate: string, timeZone: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);

  return getISODateWithTimezone(date, timeZone);
}

export function getCurrentStreak(
  completionDates: string[],
  todayISODate: string,
  timeZone: string,
) {
  let streak = 0;

  const completionDatesSet = new Set(completionDates);
  const yesterdayISODate = getPreviousISODate(todayISODate, timeZone);

  if (
    !completionDatesSet.has(todayISODate) &&
    !completionDatesSet.has(yesterdayISODate)
  ) {
    return streak;
  }

  let streakDate = completionDatesSet.has(todayISODate)
    ? todayISODate
    : yesterdayISODate;

  while (completionDatesSet.has(streakDate)) {
    streak += 1;
    streakDate = getPreviousISODate(streakDate, timeZone);
  }

  return streak;
}
