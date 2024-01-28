import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async register(userData: any): Promise<User | any> {
    const existingUser = await this.getUser(userData.email);
    if (existingUser) {
      return {
        message: 'User with supplied email already exists',
        status: 400,
      }
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
    userData.password = hashedPassword;
    const user = await this.userModel.create(userData);
    return user;
  }

  async getUser(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }
}
