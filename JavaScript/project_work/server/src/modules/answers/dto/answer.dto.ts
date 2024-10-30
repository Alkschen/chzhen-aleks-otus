import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsNumber()
  @IsOptional()
  optionId?: number;

  @IsString()
  @IsOptional()
  answerText?: string;
}

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsNumber()
  @IsOptional()
  optionId?: number;

  @IsString()
  @IsOptional()
  answerText?: string;
}
