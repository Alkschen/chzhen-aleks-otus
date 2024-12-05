import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Response } from '../../responses/entities/response.entity';

@Entity('surveys', { schema: 'survey_service' })
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => User, (author: User) => author.survey, {
    onDelete: 'SET NULL',
  })
  author: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
    eager: true,
  })
  question: Question[];

  @OneToMany(() => Response, (response) => response.survey, {
    cascade: true,
    eager: true,
  })
  response: Response[];
  // newSurvey: Promise<User>;
}
