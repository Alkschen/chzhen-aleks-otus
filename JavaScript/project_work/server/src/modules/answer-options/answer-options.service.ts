import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Option } from './entities/option.entity';
import { OptionsList } from './entities/options-list.entity';
import {
  CreateOptionDto,
  // UpdateOptionDto,
} from './dto/option.dto';
import {
  CreateOptionsListDto,
  UpdateOptionsListDto,
} from './dto/options-list.dto';

@Injectable()
export class AnswerOptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(OptionsList)
    private readonly optionListRepository: Repository<OptionsList>,
  ) {}

  async createOptionsList(
    createOptionsListDto: CreateOptionsListDto,
  ): Promise<OptionsList> {
    const optionsList = this.optionListRepository.create(createOptionsListDto);
    await this.optionListRepository.save(optionsList);
    return optionsList;
  }

  async updateOptionsList(
    id: number,
    updateOptionsListDto: UpdateOptionsListDto,
  ): Promise<OptionsList> {
    await this.optionListRepository.update(id, updateOptionsListDto);
    return this.findOneOptionsList(id);
  }

  async deleteOptionsList(id: number): Promise<void> {
    await this.optionListRepository.delete(id);
  }

  findAllOptionsList(): Promise<OptionsList[]> {
    return this.optionListRepository.find();
  }

  async findOneOptionsList(id: number): Promise<OptionsList> {
    return await this.optionListRepository.findOne({
      where: { id: id },
    });
  }

  async createOption(
    optionsListId: number,
    createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    const newOption = this.optionRepository.create({
      ...createOptionDto,
      optionsList: { id: optionsListId },
    });
    await this.optionRepository.save(newOption);
    return newOption;
  }

  async findAllOptions(optionsListId: number): Promise<Option[]> {
    return await this.optionRepository.find({
      where: { optionsList: { id: optionsListId } },
    });
  }

  // updateOption(id: number, updateOptionDto: UpdateOptionDto) {
  //   return `This action updates a #${id} answerOption`;
  // }

  // deleteOption(id: number) {
  //   return `This action removes a #${id} answerOption`;
  // }
}
