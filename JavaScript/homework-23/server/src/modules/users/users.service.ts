import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ user_id: id });
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

  async create(createUserDto: RegisterDto): Promise<User> {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    const role = await this.rolesService.findOneBy('user');
    newUser.role = role;
    // newUser.createdAt = new Date();
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(updateUserDto.user_id);
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
      const role = await this.rolesService.findOneBy(updateUserDto.role);
      if (!role) {
        throw new Error('Роль не найдена');
      }
      user.role = role;
    }
    // await this.usersRepository.update(updateUserDto.user_id, user);
    await this.usersRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
