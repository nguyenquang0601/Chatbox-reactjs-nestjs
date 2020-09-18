import { Controller, Post, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';

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
}
