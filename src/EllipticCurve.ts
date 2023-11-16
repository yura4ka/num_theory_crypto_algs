import { sqrtP } from "./CipollasAlgorithm";
import { inverse } from "./utils";

export class Point {
  x: bigint;
  y: bigint;

  constructor(x: bigint, y: bigint) {
    this.x = x;
    this.y = y;
  }

  equals(p: Point): boolean {
    return this.x === p.x && this.y === p.y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  neg(m?: bigint): Point {
    return new Point(this.x, m ? m - this.y : -this.y);
  }
}

export class EllipticCurve {
  readonly q: bigint;
  readonly a: bigint;
  readonly b: bigint;

  /**
   *  Elliptic curve E: y^2 = x^3 + ax + b
   *  over a field Fq
   */
  constructor(a: bigint, b: bigint, q: bigint) {
    this.q = q;
    this.a = a;
    this.b = b;
  }

  addPoints(p1: Point, p2: Point): Point {
    let l = p1.equals(p2)
      ? (3n * p1.x * p1.x + this.a) * inverse(2n * p1.y, this.q)
      : (p1.y - p2.y) * inverse(p1.x - p2.x, this.q);
    l %= this.q;
    let x = (-p1.x - p2.x + l * l) % this.q;
    let y = (l * (p1.x - x) - p1.y) % this.q;

    if (x < 0) x += this.q;
    if (y < 0) y += this.q;

    return new Point(x, y);
  }

  multiplePoint(k: bigint, p: Point): Point {
    let r = p.clone();
    let a = p.clone();
    k--;

    while (k > 0) {
      if (k & 1n) {
        r = this.addPoints(a, r);
      }

      a = this.addPoints(a, a);
      k >>= 1n;
    }

    return r;
  }

  pointFromNumber(n: bigint): Point | null {
    const y2 = (n * n * n + this.a * n + this.b) % this.q;
    const sqrt = sqrtP(y2, this.q);
    if (sqrt === -1n) return null;
    return new Point(n, sqrt);
  }
}
