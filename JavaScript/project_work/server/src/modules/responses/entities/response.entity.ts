import {
  Entity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Survey } from '../../surveys/entities/survey.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity('responses', { schema: 'survey_service' })
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.response, {
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => Survey, (survey: Survey) => survey.response, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  @OneToMany(() => Answer, (answer: Answer) => answer.response, {
    cascade: true,
    eager: true,
  })
  answer: Answer[];
}
