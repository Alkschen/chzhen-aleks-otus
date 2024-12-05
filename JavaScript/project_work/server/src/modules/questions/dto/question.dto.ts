import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsNotEmpty()
  @IsEnum(['multiple', 'open'])
  questionType: 'multiple' | 'open';

  @IsOptional()
  optionsListId?: number;
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  questionText: string;

  @IsOptional()
  @IsEnum(['multiple', 'open'])
  questionType: 'multiple' | 'open';

  @IsOptional()
  optionsListId?: number;
}
