import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Response } from './entities/response.entity';
// import { CreateResponseDto } from './dto/response.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepository: Repository<Response>,
  ) {}
  async create(createResponseDto: Partial<Response>): Promise<Response> {
    const newResponse = this.responsesRepository.create(createResponseDto);
    return this.responsesRepository.save(newResponse);
  }

  async findAllBySurveyId(id: number): Promise<Response[]> {
    return this.responsesRepository.find({
      where: { survey: { id } },
    });
  }

  async findAllByUserId(id: number): Promise<Response[]> {
    return this.responsesRepository.find({
      where: { user: { id } },
    });
  }

  async findById(id: number): Promise<Response> {
    return this.responsesRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.responsesRepository.delete(id);
  }
}
