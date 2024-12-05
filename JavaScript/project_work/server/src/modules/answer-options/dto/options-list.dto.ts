import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOptionsListDto {
  @IsNotEmpty()
  @IsString()
  listName: string;
}

export class UpdateOptionsListDto extends PartialType(CreateOptionsListDto) {
  @IsOptional()
  @IsString()
  listName: string;
}
