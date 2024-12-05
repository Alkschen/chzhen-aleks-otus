import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@Controller('responses/:responseId')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  create(
    @Param('responseId') responseId: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answersService.create(createAnswerDto);
  }

  @Get('')
  findAllByResponseId(@Param('responseId') id: string) {
    return this.answersService.findAllByResponseId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }
}
