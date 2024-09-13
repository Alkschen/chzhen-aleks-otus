import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

// import { IAuthUser } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('validateUser: Пользователь не найден');
    }
    const isPassValid = await compare(loginDto.password, user.password);
    if (!isPassValid) {
      throw new UnauthorizedException(
        'validateUser: Неверное имя пользователя или пароль',
      );
    }
    // без пароля
    // const { password, ...result } = user;
    // return result;
    return user;
  }

  async userLogin(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return token;
  }

  async userRegister(registerDto: RegisterDto): Promise<User> {
    const isUserExist = await this.usersService.findOneByUsername(
      registerDto.username,
    );
    if (isUserExist) {
      throw new UnauthorizedException(
        'Пользователь с таким именем уже существует',
      );
    }
    // Добавить проверку почты
    registerDto.password = await hash(registerDto.password, 10);
    const profile = await this.usersService.create(registerDto);
    // const token = this.generateToken(profile);
    return profile;
  }

  async generateToken(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
