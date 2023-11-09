import { jacobi } from "../src/JacobiSymbol";

const tests: [bigint, bigint, number | undefined, boolean][] = [
  [5n, -2n, undefined, true],
  [5n, 6n, undefined, true],
  [0n, 1n, 1, false],
  [0n, 3n, 0, false],
  [0n, 5n, 0, false],
  [1n, 1n, 1, false],
  [2n, 1n, 1, false],
  [1n, 5n, 1, false],
  [2n, 5n, -1, false],
  [3n, 5n, -1, false],
  [4n, 5n, 1, false],
  [5n, 5n, 0, false],
  [3n, 27n, 0, false],
  [4n, 27n, 1, false],
  [5n, 27n, -1, false],
];

describe("Jacobi symbol", () => {
  test.concurrent.each(tests)("(%d / %d)", (a, m, expected, throws) => {
    if (throws) expect(() => jacobi(a, m)).toThrow();
    else expect(jacobi(a, m)).toBe(expected);
  });
});
