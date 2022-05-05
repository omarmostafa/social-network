import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IMediaService } from '@modules/media/contracts/media.service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFailHttpException } from '@core/exceptions/http/upload-fail.exception';
import { Response } from '@core/types/response';
import { MediaDto } from '@modules/media/dto/media.dto';
import { TransformResponseInterceptor } from '@core/interceptors/transform-response.interceptor';

@Controller('media')
export class MediaController {
  constructor(
    @Inject(IMediaService) private readonly mediaService: IMediaService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransformResponseInterceptor)
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<MediaDto>> {
    try {
      const media = await this.mediaService.upload(file);
      return { message: 'File Uploaded Successfully', data: media };
    } catch (e) {
      throw new UploadFailHttpException();
    }
  }
}
