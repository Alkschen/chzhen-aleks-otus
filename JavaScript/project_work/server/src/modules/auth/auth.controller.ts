import { Controller, Body, Post } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.userLogin(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.userRegister(registerDto);
  }
}
