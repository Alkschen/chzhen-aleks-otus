import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Response } from '../../responses/entities/response.entity';
import { Question } from '../../questions/entities/question.entity';
import { Option } from '../../answer-options/entities/option.entity';

@Entity('answers', { schema: 'survey_service' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  // Ответ пользователя, если тип ответа открытый
  @Column({ name: 'answer_text', nullable: true })
  answerText: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => Response, (response) => response.answer, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  response: Response;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;

  @ManyToOne(() => Option, (option) => option.answer)
  option: Option;
}
