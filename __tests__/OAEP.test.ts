import { createHash, randomBytes } from "crypto";
import { mgf1, pad, unpad } from "../src/OAEP";

const mgfTests: [string, number, string, string][] = [
  ["foo", 3, "sha1", "1ac907"],
  ["foo", 5, "sha1", "1ac9075cd4"],
  ["bar", 5, "sha1", "bc0c655e01"],
  [
    "bar",
    50,
    "sha1",
    "bc0c655e016bc2931d85a2e675181adcef7f581f76df2739da74faac41627be2f7f415c89e983fd0ce80ced9878641cb4876",
  ],
  [
    "bar",
    50,
    "sha256",
    "382576a7841021cc28fc4c0948753fb8312090cea942ea4c4e735d10dc724b155f9f6069f289d61daca0cb814502ef04eae1",
  ],
];

const tests = [["hello"], ["test 1"], ["some message 12"]];

describe("OAEP", () => {
  test.concurrent.each(mgfTests)(
    "mgf1(%s, %d, %s)",
    (seed, len, alg, expected) => {
      const result = mgf1(Buffer.from(seed), len, () => createHash(alg));
      expect(result.toString("hex")).toBe(expected);
    }
  );

  test.concurrent.each(tests)("oaep %#", (message) => {
    const hashFunction = () => createHash("sha256");
    const blockSize = 256;

    const padded = pad(
      Buffer.from(message),
      Buffer.alloc(0),
      randomBytes(32),
      hashFunction,
      blockSize
    );
    const unPadded = unpad(padded, Buffer.alloc(0), hashFunction, blockSize);

    expect(unPadded.toString()).toBe(message);
  });
});
