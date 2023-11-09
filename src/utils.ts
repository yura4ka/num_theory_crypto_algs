export class NaturalNumberError extends Error {
  constructor(argument: string) {
    super(argument + " must be a natural number");
  }
}

export function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

export function abs(n: bigint): bigint {
  return n >= 0 ? n : -n;
}
