import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  optionText: string;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @IsString()
  @IsOptional()
  optionText: string;
}
