import { legendre } from "../src/LegendreSymbol";

const tests: [bigint, bigint, number | undefined, boolean][] = [
  [2n, 2n, undefined, true],
  [3n, 10n, undefined, true],
  [1n, 3n, 1, false],
  [2n, 3n, -1, false],
  [3n, 3n, 0, false],
  [4n, 3n, 1, false],
  [5n, 3n, -1, false],
  [6n, 3n, 0, false],
  [-6n, 3n, 0, false],
  [8n, 13n, -1, false],
  [-8n, 13n, -1, false],
  [9n, 13n, 1, false],
  [10n, 13n, 1, false],
  [-10n, 13n, 1, false],
  [1n, 29n, 1, false],
  [2n, 29n, -1, false],
  [9n, 29n, 1, false],
  [10n, 29n, -1, false],
  [11n, 29n, -1, false],
];

describe("Legendre symbol", () => {
  test.concurrent.each(tests)("(%d / %d)", (a, p, expected, throws) => {
    if (throws) expect(() => legendre(a, p)).toThrow();
    else expect(legendre(a, p)).toBe(expected);
  });
});
