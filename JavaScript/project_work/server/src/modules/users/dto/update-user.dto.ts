import { PartialType } from '@nestjs/mapped-types';
import {
  // IsInt,
  // IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { RegisterDto } from '../../auth/dto/register.dto';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(RegisterDto) {
  // @IsInt()
  // @IsNotEmpty()
  // id: number;

  @IsString()
  @IsOptional()
  username: string;

  @IsEnum(UserRole, { message: 'Недопустимое значение роли' })
  @IsOptional()
  role: UserRole;
}
