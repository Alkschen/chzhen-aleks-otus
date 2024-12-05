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

import { AnswerOptionsService } from './answer-options.service';
import {
  CreateOptionsListDto,
  UpdateOptionsListDto,
} from './dto/options-list.dto';
import {
  CreateOptionDto,
  // UpdateOptionDto,
} from './dto/option.dto';

@Controller('answer-options')
export class AnswerOptionsController {
  constructor(private readonly answerOptionsService: AnswerOptionsService) {}

  @Post()
  createOptinsList(@Body() createOptionsListDto: CreateOptionsListDto) {
    return this.answerOptionsService.createOptionsList(createOptionsListDto);
  }

  @Post(':optionsListId')
  createOption(
    @Param('optionsListId') optionsListId: number,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.answerOptionsService.createOption(
      optionsListId,
      createOptionDto,
    );
  }

  @Get()
  findAllOptionsList() {
    return this.answerOptionsService.findAllOptionsList();
  }

  @Get(':optionsListId')
  findOneOptionsList(@Param('optionsListId') optionsListId: number) {
    // Возвращается только наименование списка варианта ответов
    // return this.answerOptionsService.findOneOptionsList(optionsListId);
    // Возвращается список вариантов ответа
    return this.answerOptionsService.findAllOptions(optionsListId);
  }

  // @Get(':optionsListId/options')
  // findAllOptions(@Param('optionsListId') optionsListId: number) {
  //   return this.answerOptionsService.findAllOptions(optionsListId);
  // }

  @Patch(':optionsListId')
  updateOptionsList(
    @Param('optionsListId') optionsListId: number,
    @Body() updateOptionsListDto: UpdateOptionsListDto,
  ) {
    return this.answerOptionsService.updateOptionsList(
      optionsListId,
      updateOptionsListDto,
    );
  }

  @Delete(':optionsListId')
  deleteOptionsList(@Param('optionsListId') optionsListId: number) {
    return this.answerOptionsService.deleteOptionsList(optionsListId);
  }
}
