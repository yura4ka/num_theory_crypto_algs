import { EllipticCurve, Point } from "../src/EllipticCurve";
import { ECC } from "./../src/ElGamalECC";

const tests: [string, bigint, bigint, bigint, bigint, bigint, bigint][] = [
  [
    "secp112r1",
    0xdb7c2abf62e35e668076bead208bn,
    0xdb7c2abf62e35e668076bead2088n,
    0x659ef8ba043916eede8911702b22n,
    0x09487239995a5ee76b55f9c2f098n,
    0xa89ce5af8724c0a23e0e0ff77500n,
    0xdb7c2abf62e35e7628dfac6561c5n,
  ],
];

describe("ECC", () => {
  test.concurrent.each(tests)("%s", (_, q, a, b, x, y, n) => {
    const curve = new EllipticCurve(a, b, q);
    const ecc = new ECC(curve, new Point(x, y), n);
    const message = "test message";
    const encrypted = ECC.encrypt(message, ecc.publicKey);
    const decrypted = ecc.decrypt(encrypted);

    expect(decrypted).toBe(message);
  });
});
