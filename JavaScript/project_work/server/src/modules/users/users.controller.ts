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
import { Roles } from '../../common/decorators/roles.decorator';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

interface AuthRequest extends Request {
  user: any;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Roles('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @Roles('user', 'admin')
  getProfile(@Request() req: AuthRequest) {
    const user = this.usersService.findOne(req.user.id);
    return user;
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    // console.log('updateUser', updateUser);
    // updateUser.id = +id;
    try {
      return await this.usersService.update(id, updateUser);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
