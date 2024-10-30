import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from '../../questions/entities/question.entity';
import { Option } from '../entities/option.entity';

@Entity('optionslist', { schema: 'survey_service' })
export class OptionsList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'list_name', unique: true, nullable: true }) // nullable: false
  listName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: true, // nullable: false
  })
  createdAt: Date;

  @OneToMany(() => Question, (question) => question.optionsList, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  question: Question;

  @OneToMany(() => Option, (option) => option.optionsList, {
    cascade: true,
    eager: true,
  })
  option: Option;
}
