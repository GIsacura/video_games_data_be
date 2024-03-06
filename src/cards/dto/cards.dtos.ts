import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class CreateCardDto {}

export class UpdateCardDto extends PartialType(CreateCardDto) {}

export class FilterCardDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  name: string;
}
