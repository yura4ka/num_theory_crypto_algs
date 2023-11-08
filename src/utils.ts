export class NaturalNumberError extends Error {
  constructor(argument: string) {
    super(argument + " must be a natural number");
  }
}
