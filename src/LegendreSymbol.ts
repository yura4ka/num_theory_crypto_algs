import { powMod } from "./utils";

export function legendre(a: bigint, p: bigint): 0 | 1 | -1 {
  if (p < 3n) throw new Error("p must be >= 3");
  if (p % 2n === 0n) throw new Error("p must be prime");
  if (a % p === 0n) return 0;
  return powMod(a, (p - 1n) / 2n, p) === 1n ? 1 : -1;
}
