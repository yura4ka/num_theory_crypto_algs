import { sqrtP } from "../src/CipollasAlgorithm";

const tests = [
  [10n, 13n],
  [5n, 11n],
  [81n, 101n],
];

describe("Cipolla's algorithm", () => {
  test.concurrent.each(tests)("sqrt(%d, %d)", (n, p) => {
    const r = sqrtP(n, p);
    expect((r * r) % p).toBe(n);
  });
});
