import { MediaDto } from '@modules/media/dto/media.dto';

export interface IMediaRepository {
  save(mediaDto: MediaDto): Promise<MediaDto>;
}
export const IMediaRepository = Symbol('IMediaRepository');
