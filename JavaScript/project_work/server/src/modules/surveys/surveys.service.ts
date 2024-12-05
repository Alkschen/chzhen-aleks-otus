import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { findOne } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto, UpdateSurveyDto } from './dto/survey.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveysRepository: Repository<Survey>,
  ) {}

  findAll(): Promise<Survey[]> {
    return this.surveysRepository.find();
  }

  findOne(id: number): Promise<Survey> {
    return this.surveysRepository.findOne({
      where: { id },
      relations: ['author', 'question', 'response'],
    });
  }

  async create(
    createSurveyDto: CreateSurveyDto,
    author: User,
  ): Promise<Survey> {
    const newSurvey = new Survey();
    newSurvey.title = createSurveyDto.title;
    newSurvey.description = createSurveyDto.description;
    newSurvey.author = author;
    await this.surveysRepository.save(newSurvey);
    return newSurvey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    await this.surveysRepository.update(id, updateSurveyDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.surveysRepository.delete(id);
  }
}
