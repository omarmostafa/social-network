import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserDto } from '@modules/user/dto/user.dto';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'The username is required' })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsUUID()
  @IsOptional()
  readonly mediaId: string;
}

export class RegisterResponseDto {
  readonly user: UserDto;
}
