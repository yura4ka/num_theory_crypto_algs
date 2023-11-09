import { NaturalNumberError, gcd } from "./utils";

export function lcm(...args: bigint[]): bigint {
  if (args.length < 2) throw new Error("Invalid arguments");

  const [a, b] = args;
  if (a < 0 || b < 0) throw new NaturalNumberError("argument");
  if (a === 0n && b === 0n) return 0n;

  let r = (a * b) / gcd(a, b);

  for (let i = 2; i < args.length; i++) {
    if (args[i] < 0) throw new NaturalNumberError("argument");
    if (args[i] === 0n) return 0n;
    r = (r * args[i]) / gcd(r, args[i]);
  }

  return r;
}
