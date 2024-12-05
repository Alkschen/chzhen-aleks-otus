import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

// import { JwtAuthGuard } from '../../common/guard/auth.gurds';
// import { RolesGuard } from '../../common/guard/roles.guard';
// import { Roles } from '../../common/decorators/roles.decorator';

import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

@Controller('surveys/:surveyId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Param('surveyId') surveyId: number,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(surveyId, createQuestionDto);
  }

  @Get()
  findAll(@Param('surveyId') surveyId: number) {
    return this.questionsService.findAll(surveyId);
  }

  @Get(':id')
  findOne(@Param('surveyId') surveyId: number, @Param('id') id: string) {
    return this.questionsService.findOne(surveyId, +id);
  }

  @Patch(':id')
  update(
    @Param('surveyId') surveyId: number,
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(surveyId, +id, updateQuestionDto);
  }

  @Delete(':id')
  delete(@Param('surveyId') surveyId: number, @Param('id') id: string) {
    return this.questionsService.delete(surveyId, +id);
  }
}
