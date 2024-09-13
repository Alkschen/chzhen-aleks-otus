import {
  Controller,
  Body,
  Post,
  // Get,
  // Render
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // @Get('/login')
  // @Render('users/login')
  // getLogin() {
  //   return {
  //     title: 'Login',
  //   };
  // }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.userLogin(loginDto);
    return user;
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.userRegister(registerDto);
    return user;
  }
}
