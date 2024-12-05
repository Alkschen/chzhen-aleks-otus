import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OptionsList } from '../entities/options-list.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity('options', { schema: 'survey_service' })
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'option_text', nullable: false })
  optionText: string;

  @ManyToOne(() => OptionsList, (optionsList) => optionsList.option, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  optionsList: OptionsList;

  @OneToMany(() => Answer, (answer) => answer.option)
  answer: Answer;
}
