import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @Inject('MEDIA_REPOSITORY')
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(file: any): Promise<Media> {
    return this.mediaRepository.save({
      name: file?.filename,
      path: file?.path,
    });
  }
}
