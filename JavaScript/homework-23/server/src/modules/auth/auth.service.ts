import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

// import { IAuthUser } from './auth.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    // console.log('validateUser', loginDto);
    const user = await this.usersService.findOneByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException(
        `validateUser: Пользователь: " ${loginDto.username} ". Не найден. `,
      );
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

  async userLogin(loginDto: LoginDto): Promise<string> {
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

  async generateToken(user: User): Promise<string> {
    const payload = {
      user_id: user.user_id,
      username: user.username,
      role: user.role.rolename,
    };
    return this.jwtService.sign(payload);
  }
}
