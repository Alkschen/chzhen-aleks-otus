import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles', { schema: 'main' }) // убрать schema: 'main' в .env
export class Role {
  @PrimaryGeneratedColumn()
  roles_id: number;

  @Column()
  rolename: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
