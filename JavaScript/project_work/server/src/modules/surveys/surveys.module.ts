import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { Survey } from './entities/survey.entity';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Survey]), UsersModule],
  providers: [SurveysService],
  controllers: [SurveysController],
})
export class SurveysModule {}
