import type { Completion } from "#/db/schema";
import { getYesterdayISODate } from "./datetime";

export function getCurrentStreakFromCompletions(
  completions: Completion[],
  todayISODate: string,
) {
  const yesterdayISODate = getYesterdayISODate(todayISODate);
  let streak = 0;
  let isoDateBeforeCompletion: string | null = null;

  // Get the streak based on this habit's completions.
  for (const completion of completions) {
    const { completedOn } = completion;

    if (
      completedOn !== todayISODate &&
      completedOn !== yesterdayISODate &&
      completedOn !== isoDateBeforeCompletion
    ) {
      break;
    }

    streak++;
    isoDateBeforeCompletion = getYesterdayISODate(completedOn);
  }

  return streak;
}
