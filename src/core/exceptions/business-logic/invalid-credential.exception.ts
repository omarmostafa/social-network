export class InvalidCredentialException extends Error {
  constructor() {
    super('Invalid username or password');
  }
}
