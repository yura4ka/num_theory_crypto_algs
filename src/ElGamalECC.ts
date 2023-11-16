import { EllipticCurve, Point } from "./EllipticCurve";
import { getRandomBigint } from "./utils";

function stringToBigint(str: string): bigint {
  const aCode = "a".charCodeAt(0);
  const spaceCode = BigInt("z".charCodeAt(0) - aCode + 1);
  const base = spaceCode + 1n;

  let result = 0n;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += spaceCode * base ** BigInt(str.length - i - 1);
    } else if (str[i] < "a" || str[i] > "z") {
      throw new Error("method supports only letters a-z and space");
    } else {
      result += BigInt(
        BigInt(str[i].charCodeAt(0) - aCode) *
          base ** BigInt(str.length - i - 1)
      );
    }
  }

  return result;
}

function bigintToString(n: bigint): string {
  const aCode = "a".charCodeAt(0);
  const spaceCode = "z".charCodeAt(0) - aCode + 1;
  const base = BigInt(spaceCode + 1);

  const result = [];
  while (n !== 0n) {
    result.push(Number(n % base));
    n /= base;
  }

  return result
    .map((n) => (n === spaceCode ? " " : String.fromCharCode(aCode + n)))
    .reverse()
    .join("");
}

interface PublicKey {
  y: Point;
  p: Point;
  n: bigint;
  curve: EllipticCurve;
  koblitzBase: bigint;
}

type CipherText = [Point, Point];

export class ECC {
  private readonly curve: EllipticCurve;
  private readonly p: Point;
  private readonly n: bigint;
  private readonly k: bigint;
  private readonly y: Point;

  readonly koblitzBase: bigint;

  /**
   *  Elliptic curve E, point p of order n
   */
  constructor(curve: EllipticCurve, p: Point, n: bigint, koblitzBase = 256n) {
    this.curve = curve;
    this.p = p;
    this.n = n;
    this.koblitzBase = koblitzBase;

    this.k = getRandomBigint(1n, n - 1n);
    this.y = curve.multiplePoint(this.k, p);
  }

  get publicKey(): PublicKey {
    return {
      n: this.n,
      y: this.y,
      p: this.p,
      curve: this.curve,
      koblitzBase: this.koblitzBase,
    };
  }

  static encrypt(message: string, key: PublicKey): CipherText {
    const m = stringToBigint(message);
    const x = m * key.koblitzBase;

    let messagePoint: Point | null = null;

    for (let i = 1n; i < key.koblitzBase; i++) {
      messagePoint = key.curve.pointFromNumber(x + i);
      if (messagePoint) break;
    }

    if (!messagePoint)
      throw new Error("cannot map the message to the point on the curve");

    const r = getRandomBigint(1n, key.n - 1n);
    const g = key.curve.multiplePoint(r, key.p);
    const d = key.curve.multiplePoint(r, key.y);
    const h = key.curve.addPoints(messagePoint, d);

    return [g, h];
  }

  decrypt(cipher: CipherText) {
    const [g, h] = cipher;
    const s = this.curve.multiplePoint(this.k, g);
    const messagePoint = this.curve.addPoints(s.neg(this.curve.q), h);
    const m = (messagePoint.x - 1n) / this.koblitzBase;
    return bigintToString(m);
  }
}
