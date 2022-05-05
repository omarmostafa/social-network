import { MediaDto } from '@modules/media/dto/media.dto';

export interface IMediaService {
  upload(file: any): Promise<MediaDto>;
}
export const IMediaService = Symbol('IMediaService');
