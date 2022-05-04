export class UploadFile {
  readonly id: number;

  readonly path: string;

  readonly name: string;
}

export class Response<T> {
  message: string;
  data: T;
}
