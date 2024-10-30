import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      // console.log('Поиск пользователя по username', username);
      const user = await this.usersRepository.findOneBy({ username });
      return user;
    } catch (error) {
      throw error;
    }
    // return this.usersRepository.findOneBy({ username: username });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      // console.log('Поиск пользователя по email', email);
      const user = await this.usersRepository.findOneBy({ email });
      return user;
    } catch (error) {
      throw error;
    }
    // return this.usersRepository.findOneBy({ email: email });
  }

  async create(createUserDto: RegisterDto): Promise<User> {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.role = UserRole.USER;
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('Обновление. Пользователь не найден!');
    }
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }
    // await this.usersRepository.update(updateUserDto.id, user);
    await this.usersRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
