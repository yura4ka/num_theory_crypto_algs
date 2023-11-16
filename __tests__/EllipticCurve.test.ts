import { EllipticCurve, Point } from "../src/EllipticCurve";

const sumTests = [
  [17n, 10n, 95n, 31n, 1n, 54n],
  [32n, 7n, 85n, 71n, 23n, 24n],
  [46n, 25n, 76n, 20n, 37n, 22n],
  [46n, 25n, 46n, 25n, 32n, 7n],
  [49n, 34n, 95n, 31n, 1n, 43n],
  [49n, 34n, 49n, 34n, 52n, 29n],
  [10n, 76n, 49n, 34n, 3n, 6n],
  [92n, 16n, 52n, 29n, 3n, 6n],
];

const multiplicationTests = [
  [2n, 49n, 34n, 52n, 29n],
  [3n, 49n, 34n, 85n, 26n],
  [4n, 49n, 34n, 84n, 60n],
  [5n, 49n, 34n, 53n, 24n],
  [6n, 49n, 34n, 74n, 77n],
  [7n, 49n, 34n, 17n, 87n],
  [8n, 49n, 34n, 92n, 16n],
  [9n, 49n, 34n, 10n, 76n],
  [10n, 49n, 34n, 3n, 6n],
  [11n, 49n, 34n, 23n, 24n],
];

describe("Elliptic curve", () => {
  const curve = new EllipticCurve(2n, 3n, 97n);
  test.concurrent.each(sumTests)(
    "(%d, %d) + (%d, %d)",
    (x1, y1, x2, y2, x3, y3) => {
      const result = curve.addPoints(new Point(x1, y1), new Point(x2, y2));
      const expected = new Point(x3, y3);
      expect(result).toEqual(expected);
    }
  );
  test.concurrent.each(multiplicationTests)(
    "%d * (%d, %d)",
    (k, x1, y1, x2, y2) => {
      const result = curve.multiplePoint(k, new Point(x1, y1));
      const expected = new Point(x2, y2);
      expect(result).toEqual(expected);
    }
  );
});
