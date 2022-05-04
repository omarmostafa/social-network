import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialHttpException extends HttpException {
  constructor() {
    super('Invalid username or password', HttpStatus.UNAUTHORIZED);
  }
}
