import { UserDto } from '@modules/user/dto/user.dto';
import { RegisterRequestDto } from '@modules/user/dto/register.dto';
import {EditUserDto} from "@modules/user/dto/editUser.dto";

export interface IUserRepository {
  findByUserName(username: string): Promise<UserDto>;
  create(registerDto: RegisterRequestDto): Promise<UserDto>;
  edit(registerRequestDto: EditUserDto, id: string): Promise<void>;
  get(id: string): Promise<UserDto>;
}
export const IUserRepository = Symbol('IUserRepository');
