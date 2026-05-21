export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getFormattedDate(date: Date) {
  return Intl.DateTimeFormat('en-CA', {
    dateStyle: 'full',
  }).format(date);
}

export function getISODateWithTimezone(date: Date, timeZone: string) {
  const isoDate = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    dateStyle: 'short',
  }).format(date);

  return isoDate;
}

function getPreviousISODate(isoDate: string, timeZone: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
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
