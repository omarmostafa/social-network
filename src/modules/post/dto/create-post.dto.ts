import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserDto } from '@modules/user/dto/user.dto';

export class CreatePostRequestDto {
  @IsString()
  @IsOptional()
  readonly content: string;

  @IsUUID()
  @IsOptional()
  tagId: string;

  @IsUUID()
  @IsOptional()
  readonly mediaId: string;
}

export class RegisterResponseDto {
  readonly user: UserDto;
}
