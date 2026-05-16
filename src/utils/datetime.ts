export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getLocalISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getPreviousISODate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);

  return getLocalISODate(date);
}

export function getCurrentStreak(
  completionDates: string[],
  todayISODate: string,
) {
  let streak = 0;

  const completionDatesSet = new Set(completionDates);
  const yesterdayISODate = getPreviousISODate(todayISODate);

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
    streakDate = getPreviousISODate(streakDate);
  }

  return streak;
}
