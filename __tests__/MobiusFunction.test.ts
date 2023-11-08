import { mobius } from "../src/MobiusFunction";

const tests: [bigint, -1 | 0 | 1 | undefined, boolean][] = [
  [-3n, undefined, true],
  [0n, undefined, true],
  [1n, 1, false],
  [2n, -1, false],
  [3n, -1, false],
  [4n, 0, false],
  [5n, -1, false],
  [6n, 1, false],
  [7n, -1, false],
  [8n, 0, false],
  [9n, 0, false],
  [10n, 1, false],
  [11n, -1, false],
  [12n, 0, false],
  [13n, -1, false],
  [14n, 1, false],
  [15n, 1, false],
  [16n, 0, false],
  [17n, -1, false],
  [18n, 0, false],
  [19n, -1, false],
  [20n, 0, false],
  [33n, 1, false],
  [41n, -1, false],
  [47n, -1, false],
];

describe("Mobius function", () => {
  test.concurrent.each(tests)("mobius(%d)", (n, expected, throws) => {
    if (throws) expect(() => mobius(n)).toThrow();
    else expect(mobius(n)).toBe(expected);
  });
});
