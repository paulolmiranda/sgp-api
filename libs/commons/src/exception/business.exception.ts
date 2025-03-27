export class BusinessException extends Error {
  constructor(public readonly code: string) {
    super();
  }
}
