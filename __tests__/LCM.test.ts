import { lcm } from "../src/LCM";

const lcmTests: [bigint[], bigint | undefined, boolean][] = [
  [[], undefined, true],
  [[1n], undefined, true],
  [[-1n, 2n], undefined, true],
  [[1n, -2n], undefined, true],
  [[0n, 0n], 0n, false],
  [[1n, 0n], 0n, false],
  [[0n, 1n], 0n, false],
  [[4n, 1n], 4n, false],
  [[6n, 1n, 0n, 1n], 0n, false],
  [[2n, 5n], 10n, false],
  [[6n, 3n], 6n, false],
  [[18n, 4n], 36n, false],
  [[1n, 4n, 3n], 12n, false],
  [[18n, 4n, 3n], 36n, false],
  [[5n, 2n, 3n], 30n, false],
  [[4n, 6n, 8n, 2n], 24n, false],
];

describe("LCM", () => {
  test.concurrent.each(lcmTests)("lcm(%p)", (args, expected, throws) => {
    if (throws) expect(() => lcm(...args)).toThrow();
    else expect(lcm(...args)).toBe(expected);
  });
});
