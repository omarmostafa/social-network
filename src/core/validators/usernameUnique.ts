import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@modules/user/contracts/user.repository.interface';
import { UserDto } from '@modules/user/dto/user.dto';

@ValidatorConstraint({ name: 'usernameUnique', async: true })
@Injectable()
export class usernameUnique implements ValidatorConstraintInterface {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async validate(username: string): Promise<boolean> {
    const user: UserDto = await this.userRepository.findByUserName(username);
    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Username is already exist';
  }
}
