import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

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

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  // Добавить
  // @Column()
  // created_at: Date;

  // @Column()
  // updated_at: Date;
}
