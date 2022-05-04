import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '@modules/user/dto/user.dto';

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'The username is required' })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  readonly password: string;
}

export class LoginResponseDto {
  readonly token: string;

  readonly user: UserDto;
}
