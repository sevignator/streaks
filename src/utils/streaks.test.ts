import { expect, test } from "vitest";

import { getCurrentStreakFromCompletions } from "./streaks";
import { type Completion } from "#/db/schema";

test("calculate a streak from completions with a gap", () => {
  const startDate = "2026-10-06";
  const completions: Completion[] = [
    {
      completionId: 4,
      habitId: 1,
      createdAt: new Date("2026-10-06"),
      completedOn: "2026-10-06",
    },
    {
      completionId: 3,
      habitId: 1,
      createdAt: new Date("2026-10-05"),
      completedOn: "2026-10-05",
    },
    {
      completionId: 2,
      habitId: 1,
      createdAt: new Date("2026-10-04"),
      completedOn: "2026-10-04",
    },
    {
      completionId: 1,
      habitId: 1,
      createdAt: new Date("2026-10-01"),
      completedOn: "2026-10-01",
    },
  ];
  const currentStreak = getCurrentStreakFromCompletions(completions, startDate);

  expect(currentStreak).toBe(3);
});
