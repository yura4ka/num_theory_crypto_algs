import { NaturalNumberError } from "./utils";

export function mobius(n: bigint): 0 | 1 | -1 {
  if (n <= 0) throw new NaturalNumberError("n");
  if (n === 1n) return 1;

  let p = 0;
  if (n % 2n === 0n) {
    n /= 2n;
    p++;

    if (n % 2n === 0n) return 0;
  }

  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) {
      n /= i;
      p++;

      if (n % i === 0n) return 0;
    }
  }

  // if (p === 0) return -1;
  if (n > 1) p++;

  return p % 2 == 0 ? 1 : -1;
}
