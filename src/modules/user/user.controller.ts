import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: any) {
    try {
      return this.userService.register(userData);
    } catch (error) {
      throw new Error(error);
    }
  }
}
