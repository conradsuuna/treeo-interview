import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (user) {
      const payload = { sub: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: user,
      };
    }
    throw new UnauthorizedException();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new NotAcceptableException('User not found with supplied email');
    }
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        delete user.password;
        return user;
      }
      throw new NotAcceptableException('Invalid password');
    }
    return null;
  }
}
