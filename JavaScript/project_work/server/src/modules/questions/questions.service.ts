import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from './entities/question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  async create(
    surveyId: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const newQuestion = this.questionsRepository.create({
      ...createQuestionDto,
      survey: { id: surveyId },
    });
    await this.questionsRepository.save(newQuestion);
    return newQuestion;
  }

  async findAll(surveyId: number): Promise<Question[]> {
    return await this.questionsRepository.find({
      where: { survey: { id: surveyId } },
      // relations: ['survey'],
    });
  }

  async findOne(surveyId: number, id: number): Promise<Question> {
    return this.questionsRepository.findOneBy({
      id: id,
      survey: { id: surveyId },
    });
  }

  async update(
    surveyId: number,
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.findOne(surveyId, id);
  }

  async delete(surveyId: number, id: number): Promise<void> {
    await this.questionsRepository.delete({ id, survey: { id: surveyId } });
  }
}
