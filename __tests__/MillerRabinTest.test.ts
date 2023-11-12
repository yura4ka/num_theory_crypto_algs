import { isPrime } from "../src/MillerRabinTest";

const tests: [bigint, boolean][] = [
  [2n, true],
  [3n, true],
  [4n, false],
  [5n, true],
  [6n, false],
  [7n, true],
  [8n, false],
  [9n, false],
  [10n, false],
  [11n, true],
  [12n, false],
  [13n, true],
  [14n, false],
  [15n, false],
  [16n, false],
  [17n, true],
  [18n, false],
  [19n, true],
  [20n, false],
  [21n, false],
  [22n, false],
  [23n, true],
  [24n, false],
];

describe("Miller-Rabin test", () => {
  test.concurrent.each(tests)("isPrime(%d)", (n, expected) => {
    expect(isPrime(n)).toBe(expected);
  });
});
