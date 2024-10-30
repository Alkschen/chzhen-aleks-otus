import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guard/auth.gurds';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { SurveysService } from './surveys.service';
import { CreateSurveyDto, UpdateSurveyDto } from './dto/survey.dto';

@Controller('surveys')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SurveysController {
  constructor(private readonly surveyService: SurveysService) {}

  @Get('')
  @Roles('user', 'admin')
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.surveyService.findOne(id);
  }

  @Post('')
  @Roles('admin')
  async create(@Body() createSurveyDto: CreateSurveyDto, @Req() req: any) {
    return await this.surveyService.create(createSurveyDto, req.user);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.surveyService.delete(+id);
  }
}
