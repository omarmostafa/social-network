import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { IUserRepository } from '@modules/user/contracts/user.repository.interface';
import { UserDto } from '@modules/user/dto/user.dto';
import { RegisterRequestDto } from '@modules/user/dto/register.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly postgresUserRepository: Repository<User>,
  ) {}

  async findByUserName(username: string): Promise<UserDto> {
    return this.postgresUserRepository.findOne({ username });
  }

  async create(registerDto: RegisterRequestDto): Promise<UserDto> {
    return this.postgresUserRepository.save(registerDto);
  }
}
