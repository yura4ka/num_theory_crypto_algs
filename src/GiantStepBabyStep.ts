import { sqrt } from "./utils";

export function log(a: bigint, b: bigint, m: bigint): bigint {
  let n = sqrt(m) + 1n;

  let an = 1n;
  for (let i = 0n; i < n; ++i) an = (an * a) % m;

  const map = new Map<bigint, bigint>();
  let cur = b;
  for (let q = 0n; q <= n; q++) {
    map.set(cur, q);
    cur = (cur * a) % m;
  }

  cur = 1n;
  for (let p = 1n; p <= n; p++) {
    cur = (cur * an) % m;
    const val = map.get(cur);
    if (val !== undefined) {
      return n * p - val;
    }
  }

  return -1n;
}
