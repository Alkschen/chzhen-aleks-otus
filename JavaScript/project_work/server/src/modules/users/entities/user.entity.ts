import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Survey } from '../../surveys/entities/survey.entity';
import { Response } from '../../responses/entities/response.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users', { schema: 'survey_service' }) // убрать schema: 'main' в .env
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Survey, (survey) => survey.author)
  survey: Survey[];

  @OneToMany(() => Response, (response) => response.user, {
    cascade: true,
    eager: true,
  })
  response: Response[];
}
