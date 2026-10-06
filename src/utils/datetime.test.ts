import { expect, test } from "vitest";

import { getYesterdayISODate } from "./datetime";

test("get the previous ISO date", () => {
  const today = "1970-01-02";
  const yesterday = getYesterdayISODate(today);
  expect(yesterday).toBe("1970-01-01");
});
