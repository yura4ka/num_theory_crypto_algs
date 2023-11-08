export function eulerPhi(n: bigint): bigint {
  if (n <= 0) throw new Error("n must be a natural number");

  let result = 1n;
  for (let i = 2n; i * i <= n; i++) {
    let p = 1n;
    while (n % i === 0n) {
      p *= i;
      n /= i;
    }
    p /= i;
    if (p >= 1) result *= p * (i - 1n);
  }

  return --n ? n * result : result;
}
