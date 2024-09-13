import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    // super({ usernameField: 'email' }); // Авторизация по почте
  }

  async validate(loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }
    return user;
  }
}
