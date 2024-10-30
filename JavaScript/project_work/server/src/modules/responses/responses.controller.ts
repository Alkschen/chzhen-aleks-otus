import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { ResponsesService } from './responses.service';
import { Response } from './entities/response.entity';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  async create(
    @Body() createResponseDto: Partial<Response>,
  ): Promise<Response> {
    return this.responsesService.create(createResponseDto);
  }

  @Get('user/:id')
  async findAllByUserId(@Param('id') id: string): Promise<Response[]> {
    return this.responsesService.findAllByUserId(+id);
  }

  @Get('survey/:id')
  async findAllBySurveyId(@Param('id') id: string): Promise<Response[]> {
    return this.responsesService.findAllBySurveyId(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.responsesService.delete(+id);
  }
}
