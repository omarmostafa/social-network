import { Inject, Injectable } from '@nestjs/common';
import { IMediaProvider } from '@modules/media/contracts/media.provider.interface';
import * as fs from 'fs';
import { UploadFailException } from '@core/exceptions/business-logic/upload-fail.exception';

@Injectable()
export class LocalMediaProvider implements IMediaProvider {
  constructor() {}

  async upload(file: any): Promise<string> {
    const path = `./uploads/${Date.now()}.jpg`;
    fs.writeFile(path, file.buffer, (err) => {
      if (err) {
        throw new UploadFailException();
      }
    });
    return path;
  }
}
