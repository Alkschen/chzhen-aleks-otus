// import {} from 'class-validator';
// import { Role } from '../../users/entities/role.entity';

export class RegisterDto {
  user_id: number;
  username: string;
  password: string;
  email?: string;
  roleId?: number;
}
