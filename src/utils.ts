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

export function inverse(a: bigint, m: bigint): bigint {
  let q: bigint;
  let t = 0n;
  let t1 = 1n;
  let r = m;

  a %= m;
  if (a < 0) a += m;

  while (a !== 0n) {
    q = r / a;
    [t, t1] = [t1, t - q * t1];
    [r, a] = [a, r - q * a];
  }

  if (r > 1n) throw new Error("divisors should be pairwise coprime");
  if (t < 0n) t += m;

  return t;
}

export function getRandomBigint(min: bigint, max: bigint) {
  if (min === max) return min;
  const difference = max - min;
  const differenceLength = difference.toString().length;
  let multiplier = "";
  while (multiplier.length < differenceLength) {
    multiplier += Math.random().toString().split(".")[1];
  }
  multiplier = multiplier.slice(0, differenceLength);
  const divisor = "1" + "0".repeat(differenceLength);

  const randomDifference = (difference * BigInt(multiplier)) / BigInt(divisor);

  return min + randomDifference;
}

export function powMod(base: bigint, exponent: bigint, modulus: bigint) {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return result;
}
