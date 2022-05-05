import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IMediaRepository } from '@modules/media/contracts/media.repository.interface';
import { Media } from '@modules/media/entities/media.entity';
import { MediaDto } from '@modules/media/dto/media.dto';

@Injectable()
export class MediaRepository implements IMediaRepository {
  constructor(
    @Inject('MEDIA_REPOSITORY')
    private readonly postgresMediaRepository: Repository<Media>,
  ) {}

  async save(mediaDto: MediaDto): Promise<MediaDto> {
    return this.postgresMediaRepository.save({
      name: mediaDto?.name,
      path: mediaDto?.path,
    });
  }
}
