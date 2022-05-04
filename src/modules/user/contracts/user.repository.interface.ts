import { UserDto } from '@modules/user/dto/user.dto';
import { RegisterRequestDto } from '@modules/user/dto/register.dto';

export interface IUserRepository {
  findByUserName(username: string): Promise<UserDto>;
  create(registerDto: RegisterRequestDto): Promise<UserDto>;
}
export const IUserRepository = Symbol('IUserRepository');
