import {
  Controller,
  Get,
  Req,
  // Res,
  // UseGuards,
  Render,
} from '@nestjs/common';

// import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
// import { LocalAuthGuard, JwtAuthGuard } from './auth/auth.gurds';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor() {}
  // private readonly appService: AppService,
  // private readonly authService: AuthService,

  @Get()
  @Render('index')
  getHome(@Req() req: Request) {
    const title = 'Home';
    const users: User | undefined = (req as any).user as User;
    return {
      title,
      users,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
