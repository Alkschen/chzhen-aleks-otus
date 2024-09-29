import { RegisterDto } from '../../auth/dto/register.dto';
// import { Role } from '../../users/entities/role.entity';

export class UpdateUserDto extends RegisterDto {
  //   user_id: number;
  //   username: string;
  //   email?: string;
  role?: string;
}
