import { getFactor } from "../src/PollardsRho";

const tests: [bigint, bigint | undefined, boolean][] = [
  [0n, 0n, false],
  [1n, 1n, false],
  [13n, 13n, false],
  [-13n, undefined, true],
  [1111n, 11n, false],
  [-1111n, undefined, true],
  [1189n, 41n, false],
  [8051n, 97n, false],
  [10403n, 101n, false],
];

describe("Pollards Rho", () => {
  test.concurrent.each(tests)("(%d)", (n, expected, throws) => {
    if (throws) expect(() => getFactor(n)).toThrow();
    else expect(getFactor(n)).toBe(expected);
  });
});
