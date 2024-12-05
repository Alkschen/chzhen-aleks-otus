import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Answer } from './entities/answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,
  ) {}
  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answersRepository.save(createAnswerDto);
  }

  async findAllByResponseId(id: number): Promise<Answer[]> {
    return this.answersRepository.find({
      where: { response: { id: id } },
    });
  }

  async findAllByQuestionId(id: number): Promise<Answer[]> {
    return this.answersRepository.find({
      where: { question: { id: id } },
    });
  }

  async findOneAnswer(id: number): Promise<Answer> {
    return this.answersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    await this.answersRepository.update(id, updateAnswerDto);
    return this.findOneAnswer(id);
  }
}
