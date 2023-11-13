import { Hash } from "crypto";

export function mgf1(seed: Buffer, maskLen: number, hashFunction: () => Hash) {
  let t = Buffer.alloc(0);

  for (let counter = 0; t.length < maskLen; counter++) {
    const c = Buffer.alloc(4);
    c.writeUInt32BE(counter, 0);
    const hash = hashFunction();
    hash.update(Buffer.concat([seed, c]));
    t = Buffer.concat([t, hash.digest()]);
  }

  return t.subarray(0, maskLen);
}

export function pad(
  message: Buffer,
  label: Buffer,
  seed: Buffer,
  hashFunction: () => Hash,
  blockSize: number
) {
  const hLen = hashFunction().digest().length;

  if (message.length > blockSize - 2 * hLen - 2) {
    throw new Error("Message too long for OAEP padding.");
  }

  const lHash = hashFunction();
  lHash.update(label);

  const psLen = blockSize - message.length - 2 * hLen - 2;
  const padding = Buffer.alloc(psLen, 0x00);

  const db = Buffer.concat([
    lHash.digest(),
    padding,
    Buffer.from([0x01]),
    message,
  ]);

  const dbMask = mgf1(seed, db.length, hashFunction);
  const maskedDb = xorBuffers(db, dbMask);

  const seedMask = mgf1(maskedDb, hLen, hashFunction);
  const maskedSeed = xorBuffers(seed, seedMask);

  const paddedMessage = Buffer.concat([
    Buffer.from([0x00]),
    maskedSeed,
    maskedDb,
  ]);

  return paddedMessage;
}

export function unpad(
  message: Buffer,
  label: Buffer,
  hashFunction: () => Hash,
  blockSize: number
) {
  if (message[0] !== 0x00) throw new Error("invalid padding");

  const hLen = hashFunction().digest().length;

  const lHash = hashFunction();
  lHash.update(label);

  const maskedSeed = message.subarray(1, 1 + hLen);
  const maskedDb = message.subarray(1 + hLen);

  const seedMask = mgf1(maskedDb, hLen, hashFunction);
  const seed = xorBuffers(maskedSeed, seedMask);

  const dbMask = mgf1(seed, blockSize - hLen - 1, hashFunction);
  const db = xorBuffers(maskedDb, dbMask);

  const newLHash = db.subarray(0, hLen);
  if (!newLHash.equals(lHash.digest())) throw new Error("invalid padding");

  let i = hLen;
  while (db[i] === 0x00) i++;

  if (i === hLen || db[i] !== 0x01) throw new Error("invalid padding");

  const result = db.subarray(i + 1);

  return result;
}

function xorBuffers(buffer1: Buffer, buffer2: Buffer) {
  const result = Buffer.alloc(buffer1.byteLength);
  for (let i = 0; i < buffer1.length; i++) {
    result[i] = buffer1[i] ^ buffer2[i];
  }
  return result;
}
