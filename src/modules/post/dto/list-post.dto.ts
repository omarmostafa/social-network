import { IsEnum, IsOptional } from 'class-validator';

export class ListPostDto {
  @IsEnum(['createdAt', 'numberOfLikes'])
  @IsOptional()
  readonly sort_by?: string;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  readonly tag?: string;

  userId?: string;

  page?: number;
}
