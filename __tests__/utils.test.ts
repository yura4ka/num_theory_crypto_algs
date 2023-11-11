import { gcd, sqrt } from "../src/utils";

const gcdTests = [
  [54n, 24n, 6n],
  [48n, 18n, 6n],
  [22n, 33n, 11n],
  [11n, 17n, 1n],
  [17n, 11n, 1n],
  [225n, 135n, 45n],
];

const sqrtTests = [
  [0n, 0n],
  [1n, 1n],
  [2n, 1n],
  [3n, 1n],
  [4n, 2n],
  [5n, 2n],
  [6n, 2n],
  [7n, 2n],
  [8n, 2n],
  [9n, 3n],
  [10n, 3n],
  [11n, 3n],
  [12n, 3n],
  [13n, 3n],
  [14n, 3n],
  [15n, 3n],
  [16n, 4n],
];

describe("GCD", () => {
  test.concurrent.each(gcdTests)("gcd(%d, %d)", (a, b, expected) => {
    expect(gcd(a, b)).toEqual(expected);
  });
});

describe("SQRT", () => {
  test.concurrent.each(sqrtTests)("sqrt(%d)", (n, expected) => {
    expect(sqrt(n)).toEqual(expected);
  });
});
