import { gcd, abs } from "./utils";

export function getFactor(n: bigint): bigint {
  if (n < 0) throw new Error("n must be positive integer");
  if (n === 0n) return 0n;
  if (n === 1n) return 1n;

  const g = (x: bigint) => (x * x + 1n) % n;

  let x = 2n;
  let y = x;
  let d = 1n;

  while (d === 1n) {
    x = g(x);
    y = g(g(y));
    d = gcd(abs(x - y), n);
  }

  return d;
}
