import {IsNotEmpty, IsOptional, IsString, IsUUID, Validate} from 'class-validator';
import { UserDto } from '@modules/user/dto/user.dto';
import {usernameUnique} from "@core/validators/usernameUnique";

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'The username is required' })
  @Validate(usernameUnique)
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsUUID()
  @IsOptional()
  readonly mediaId?: string;
}

export class RegisterResponseDto {
  readonly user: UserDto;
}
