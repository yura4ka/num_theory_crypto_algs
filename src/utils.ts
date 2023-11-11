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

function bitLength(n: bigint) {
  return n.toString(16).length * 4;
}

export function sqrt(n: bigint): bigint {
  if (n < 0n) {
    throw "square root of negative numbers is not supported";
  }

  if (n < 2n) {
    return n;
  }

  function newtonIteration(n: bigint, x0: bigint) {
    const x1 = (n / x0 + x0) >> 1n;
    if (x0 === x1 || x0 === x1 - 1n) {
      return x0;
    }
    return newtonIteration(n, x1);
  }

  const guess =
    1n +
    (sqrt(n >> BigInt(Math.floor(bitLength(n) / 2))) <<
      BigInt(Math.floor(bitLength(n) / 4)));

  return newtonIteration(n, guess);
}
