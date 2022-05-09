import { RegisterRequestDto } from '@modules/user/dto/register.dto';
import { UserDto } from '@modules/user/dto/user.dto';
import {EditUserDto} from "@modules/user/dto/editUser.dto";

export interface IUserService {
  create(registerRequestDto: RegisterRequestDto): Promise<UserDto>;
  edit(registerRequestDto: EditUserDto, id: string): Promise<void>;
  get(id: string): Promise<UserDto>;
}
export const IUserService = Symbol('IUserService');
