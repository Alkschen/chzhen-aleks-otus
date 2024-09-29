import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from '../roles/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  // async update(updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.findOne(updateUserDto.user_id);
  //   // await this.usersRepository.update(updateUserDto.user_id, user);
  //   await this.usersRepository.save(user);
  //   return user;
  // }

  // async delete(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }

  async findAllRoles(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  createRole(rolename: string): Promise<Role> {
    const newRole = new Role();
    newRole.rolename = rolename;
    return this.rolesRepository.save(newRole);
  }

  async findOneBy(rolename: string): Promise<Role> {
    return await this.rolesRepository.findOneBy({ rolename: rolename });
  }
}
