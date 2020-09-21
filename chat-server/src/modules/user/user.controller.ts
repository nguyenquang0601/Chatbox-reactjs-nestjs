import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { User } from 'src/common/auth/user.decorator';

@Controller('')
export class UserController {
  constructor(
    private userService: UserService
  ) {

  }
  @Post('login')
  async Login(@Body() input, @Req() req) {

    console.log(input)
    return this.userService.login(input)
  }
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@User() id) {
    const user = await this.userService.getUser(id)
    return {
      id: user.id,
      username: user.name,
      room: user.room
    }
    // console.log(user)
  }
}
