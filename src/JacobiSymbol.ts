import { legendre } from "./LegendreSymbol";

export function jacobi(a: bigint, m: bigint): 0 | 1 | -1 {
  if (m <= 0 || m % 2n === 0n)
    throw new Error("m must be a positive odd integer");

  let result = 1;
  for (let i = 3n; i * i < m; i += 2n) {
    while (m % i === 0n) {
      result *= legendre(a, i);
      m /= i;
    }
  }

  if (m > 1) result *= legendre(a, m);

  return result as 0 | 1 | -1;
}
