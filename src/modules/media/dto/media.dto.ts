import { UserDto } from '@modules/user/dto/user.dto';

export interface MediaDto {
  id?: string;
  name: string;
  path: string;
  user?: UserDto;
  deletedAt?: Date;
}
