import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadFailHttpException extends HttpException {
  constructor() {
    super('Upload Failed', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
