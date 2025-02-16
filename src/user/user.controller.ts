import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.userService.findByEmail(req.user.email);
    return user;
  }
}
