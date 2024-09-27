import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from '../../common/guard/auth.gurds';
import { RolesGuard } from '../../common/guard/roles.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from '../../common/decorators/roles.decorator';

interface AuthRequest extends Request {
  user: any;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Roles('user', 'admin')
  getProfile(@Request() req: AuthRequest) {
    const user = this.usersService.findOne(req.user.user_id);
    return user;
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    console.log('updateUser', updateUser);
    updateUser.user_id = +id;
    try {
      return await this.usersService.update(updateUser);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
