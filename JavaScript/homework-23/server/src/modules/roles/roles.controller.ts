import {
  Controller,
  Get,
  Body,
  // Put,
  // Delete,
  UseGuards,
  Post,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guard/auth.gurds';
import { RolesGuard } from '../../common/guard/roles.guard';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly usersService: RolesService) {}

  @Get('')
  @Roles('admin')
  getRoles(): Promise<Role[]> {
    return this.usersService.findAllRoles();
  }

  @Post('')
  @Roles('admin')
  createRole(@Body() { rolename }): Promise<Role> {
    return this.usersService.createRole(rolename);
  }
}
