function inverse(a: bigint, m: bigint): bigint {
  let q: bigint;
  let t = 0n;
  let t1 = 1n;
  let r = m;

  while (a !== 0n) {
    q = r / a;
    [t, t1] = [t1, t - q * t1];
    [r, a] = [a, r - q * a];
  }

  if (r > 1n) throw new Error("divisors should be pairwise coprime");
  if (t < 0n) t += m;

  return t;
}

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
