import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Survey } from '../../surveys/entities/survey.entity';
import { OptionsList } from '../../answer-options/entities/options-list.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity('questions', { schema: 'survey_service' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'question_text', type: 'text', nullable: false }) // nullable: false
  questionText: string;

  @Column({
    name: 'question_type',
    type: 'enum',
    enum: ['multiple', 'open'],
    nullable: false,
  })
  questionType: 'multiple' | 'open';

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => Survey, (survey) => survey.question, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  survey: Survey;

  @ManyToOne(() => OptionsList, (optionsList) => optionsList.question)
  optionsList: OptionsList;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
