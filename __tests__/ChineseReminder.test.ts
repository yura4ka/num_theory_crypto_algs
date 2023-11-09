import {
  CongruenceParams,
  solveCongruenceSystem,
} from "./../src/ChineseReminder";
const tests: [CongruenceParams[], bigint | undefined, boolean][] = [
  [
    [
      { c: 2n, m: 6n },
      { c: 5n, m: 9n },
      { c: 7n, m: 15n },
    ],
    undefined,
    true,
  ],
  [
    [
      { c: 2n, m: 5n },
      { c: 3n, m: 7n },
    ],
    17n,
    false,
  ],
  [
    [
      { c: 2n, m: 3n },
      { c: 3n, m: 8n },
    ],
    11n,
    false,
  ],
  [
    [
      { c: 2n, m: 5n },
      { c: 3n, m: 7n },
      { c: 10n, m: 11n },
    ],
    87n,
    false,
  ],
  [
    [
      { c: 3n, m: 7n },
      { c: 3n, m: 5n },
      { c: 4n, m: 12n },
    ],
    388n,
    false,
  ],
];

describe("Chinese Reminder Theorem", () => {
  test.concurrent.each(tests)("(%#)", (data, expected, throws) => {
    if (throws) expect(() => solveCongruenceSystem(data)).toThrow();
    else expect(solveCongruenceSystem(data)).toBe(expected);
  });
});
