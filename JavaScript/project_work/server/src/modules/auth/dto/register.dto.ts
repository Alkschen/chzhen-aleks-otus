import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  // @IsString()
  // @IsOptional()
  // role?: string;
}
