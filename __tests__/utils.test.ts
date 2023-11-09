import { gcd } from "../src/utils";

const gcdTests = [
  [54n, 24n, 6n],
  [48n, 18n, 6n],
  [22n, 33n, 11n],
  [11n, 17n, 1n],
  [17n, 11n, 1n],
  [225n, 135n, 45n],
];

describe("GCD", () => {
  test.concurrent.each(gcdTests)("gcd(%d, %d)", (a, b, expected) => {
    expect(gcd(a, b)).toEqual(expected);
  });
});
