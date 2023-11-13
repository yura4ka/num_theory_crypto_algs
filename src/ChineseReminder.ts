import { inverse } from "./utils";

// x = c(mod m)

export interface CongruenceParams {
  c: bigint;
  m: bigint;
}

export function solveCongruenceSystem(data: CongruenceParams[]): bigint {
  let M = data.reduce((agg, curr) => agg * curr.m, 1n);

  let result = 0n;
  for (const i of data) {
    let mi = M / i.m;
    result += mi * inverse(mi, i.m) * i.c;
    result %= M;
  }

  return result;
}
