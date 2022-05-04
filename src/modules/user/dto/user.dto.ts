import { MediaDto } from '@modules/media/dto/media.dto';

export interface UserDto {
  id: string;
  username: string;
  password: string;
  name: string;
  mediaId: string;
  media?: MediaDto;
  createdAt: Date;
  updatedAt: Date;
}
