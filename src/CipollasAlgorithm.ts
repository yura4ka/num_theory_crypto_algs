import { legendre } from "./LegendreSymbol";
import { sqrt } from "./utils";

interface Point {
  x: bigint;
  y: bigint;
}

export function sqrtP(n: bigint, p: bigint): bigint {
  if (p < 3n) throw new Error("p must be positive odd integer");
  if (legendre(n, p) !== 1) return -1n;

  let a = 0n;
  let s = (a * a - n + p) % p;

  while (legendre(s, p) !== -1) {
    a++;
    s = (a * a - n + p) % p;
  }

  const mul = (a: Point, b: Point): Point => ({
    x: (a.x * b.x + a.y * b.y * s) % p,
    y: (a.x * b.y + b.x * a.y) % p,
  });

  let r = { x: 1n, y: 0n };
  let w = { x: a, y: 1n };
  let nn = ((p + 1n) >> 1n) % p;
  while (nn > 0) {
    if ((nn & 1n) === 1n) {
      r = mul(r, w);
    }
    w = mul(w, w);
    nn >>= 1n;
  }

  if (r.y !== 0n) return 0n;
  if ((r.x * r.x) % p !== n) return 0n;
  return r.x;
}
