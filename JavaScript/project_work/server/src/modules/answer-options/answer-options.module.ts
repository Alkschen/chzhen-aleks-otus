import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from './entities/option.entity';
import { OptionsList } from './entities/options-list.entity';
import { AnswerOptionsService } from './answer-options.service';
import { AnswerOptionsController } from './answer-options.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Option, OptionsList])],
  controllers: [AnswerOptionsController],
  providers: [AnswerOptionsService],
})
export class AnswerOptionsModule {}
