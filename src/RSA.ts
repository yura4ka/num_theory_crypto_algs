import { isPrime } from "./MillerRabinTest";
import { pad, unpad } from "./OAEP";
import { getRandomBigint, inverse, powMod } from "./utils";
import crypto from "crypto";

interface PublicKey {
  n: bigint;
  e: bigint;
}

function getRandomPrime() {
  let n: bigint;
  do {
    n = getRandomBigint(BigInt(1e99), BigInt(1e100));
  } while (!isPrime(n));
  return n;
}

export class RSA {
  readonly publicKey: PublicKey;
  readonly privateKey: bigint;

  constructor(p?: bigint, q?: bigint) {
    if (!p) p = getRandomPrime();
    if (!q) q = getRandomPrime();

    const n = p * q;
    const lambda = (p - 1n) * (q - 1n);
    const e = 65537n;
    const d = inverse(e, lambda);

    this.publicKey = { n, e };
    this.privateKey = d;
  }

  static encrypt(message: string, key: PublicKey): string {
    const blockSize = Buffer.from(key.n.toString(16), "hex").length;

    const paddedMessage = pad(
      Buffer.from(message),
      Buffer.alloc(0),
      crypto.randomBytes(32),
      () => crypto.createHash("sha256"),
      blockSize
    );

    const m = BigInt("0x" + paddedMessage.toString("hex"));

    const encrypted = powMod(m, key.e, key.n);
    return encrypted.toString();
  }

  decrypt(message: string) {
    const m = BigInt(message);
    const decrypted = powMod(m, this.privateKey, this.publicKey.n);
    let hex = decrypted.toString(16);

    if (hex.length % 2 !== 0) hex = "0" + hex;
    const messageBuffer = Buffer.concat([
      Buffer.from([0x00]),
      Buffer.from(hex, "hex"),
    ]);

    const blockSize = Buffer.from(this.publicKey.n.toString(16), "hex").length;

    const result = unpad(
      messageBuffer,
      Buffer.alloc(0),
      () => crypto.createHash("sha256"),
      blockSize
    );

    return result.toString("utf-8");
  }
}
