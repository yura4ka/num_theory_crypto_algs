import { RSA } from "../src/RSA";

describe("RSA", () => {
  test("rsa test", () => {
    const rsa = new RSA();
    const message = "test message";
    const encrypted = RSA.encrypt(message, rsa.publicKey);
    const decrypted = rsa.decrypt(encrypted);
    expect(decrypted).toBe(message);
  });
});
