import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'main' }) // убрать schema: 'main' в .env
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // Добавить
  // @Column()
  // created_at: Date;

  // @Column()
  // updated_at: Date;
}
