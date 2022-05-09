import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/contracts/user.repository.interface';
import { UserDto } from '@modules/user/dto/user.dto';
import { hash } from 'bcrypt';
import { RegisterRequestDto } from '@modules/user/dto/register.dto';
import { IUserService } from '@modules/user/contracts/user.service.interface';
import {EditUserDto} from "@modules/user/dto/editUser.dto";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async create(registerRequestDto: RegisterRequestDto): Promise<UserDto> {
    registerRequestDto.password = await hash(registerRequestDto.password, 12);
    return this.userRepository.create(registerRequestDto);
  }

  async get(id: string): Promise<UserDto> {
    return this.userRepository.get(id);
  }

  async edit(registerRequestDto: EditUserDto, id: string): Promise<void> {
    await this.userRepository.edit(registerRequestDto,id);
  }
}
