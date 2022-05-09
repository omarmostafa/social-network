import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { UserDto } from '@modules/user/dto/user.dto';
import { usernameUnique } from '@core/validators/usernameUnique';

export class EditUserDto {
  @IsString()
  @IsOptional()
  @Validate(usernameUnique)
  readonly username: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsUUID()
  @IsOptional()
  readonly mediaId?: string;
}
