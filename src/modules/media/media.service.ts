import { Inject, Injectable } from '@nestjs/common';
import { IMediaService } from '@modules/media/contracts/media.service.interface';
import { MediaDto } from '@modules/media/dto/media.dto';
import { IMediaRepository } from '@modules/media/contracts/media.repository.interface';
import { IMediaProvider } from '@modules/media/contracts/media.provider.interface';

@Injectable()
export class MediaService implements IMediaService {
  constructor(
    @Inject(IMediaRepository)
    private readonly mediaRepository: IMediaRepository,
    @Inject(IMediaProvider) private readonly mediaProvider: IMediaProvider,
  ) {}

  async upload(file: any): Promise<MediaDto> {
    const filePath: string = await this.mediaProvider.upload(file);
    return this.mediaRepository.save({
      name: file?.originalname,
      path: filePath,
    });
  }
}
