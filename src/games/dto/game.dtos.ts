import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class CreateGameDto {}

export class UpdateGameDto extends PartialType(CreateGameDto) {}

export class FilterGameDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;

  @IsOptional()
  name: string;

  @IsOptional()
  genres: string;

  @IsOptional()
  platforms: string;
}
