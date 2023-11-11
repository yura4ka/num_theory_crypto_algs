import { log } from "../src/GiantStepBabyStep";

const tests = [
  [2n, 5n, 1019n, 10n],
  [5n, 4n, 23n, 4n],
  [5n, 10n, 23n, 3n],
  [10n, 18n, 23n, 4n],
];

describe("Giant Step Baby Step", () => {
  test.concurrent.each(tests)("log(%d, %d) mod %d", (a, b, m, expected) => {
    expect(log(a, b, m)).toBe(expected);
  });
});
