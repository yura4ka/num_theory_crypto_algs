import { getRandomBigint, powMod } from "./utils";

export function isPrime(n: bigint, k = 10): boolean {
  if (n < 3n) return true;
  if (n % 2n === 0n) return false;

  let s = 0;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }

  for (let i = 0; i < k; i++) {
    let a = getRandomBigint(2n, n - 1n);
    let x = powMod(a, d, n);
    for (let j = 0; j < s; j++) {
      let y = (x * x) % n;
      if (y === 1n && x !== 1n && x !== n - 1n) return false;
      x = y;
    }
    if (x !== 1n) return false;
  }

  return true;
}
