import { RegisterRequestDto } from '@modules/user/dto/register.dto';
import { UserDto } from '@modules/user/dto/user.dto';

export interface IUserService {
  create(registerRequestDto: RegisterRequestDto): Promise<UserDto>;
}
export const IUserService = Symbol('IUserService');
