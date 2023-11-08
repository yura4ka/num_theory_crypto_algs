import { eulerPhi } from "../src/EulerPhi";

const tests: [bigint, bigint | undefined, boolean][] = [
  [-3n, undefined, true],
  [0n, undefined, true],
  [1n, 1n, false],
  [2n, 1n, false],
  [13n, 12n, false],
  [15n, 8n, false],
  [38n, 18n, false],
  [41n, 40n, false],
  [900n, 240n, false],
];

describe("Euler's phi function", () => {
  test.concurrent.each(tests)("phi(%d)", (n, expected, throws) => {
    if (throws) expect(() => eulerPhi(n)).toThrow();
    else expect(eulerPhi(n)).toBe(expected);
  });
});
