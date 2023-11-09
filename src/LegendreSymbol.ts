export function legendre(a: bigint, p: bigint): 0 | 1 | -1 {
  if (p < 3n) throw new Error("p must be >= 3");
  if (a % p === 0n) return 0;
  return a ** ((p - 1n) / 2n) % p === 1n ? 1 : -1;
}
