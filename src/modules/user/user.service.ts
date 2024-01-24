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

  async register(userData: any): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
        userData.password,
      saltOrRounds,
    );
    userData.password = hashedPassword;
    const user = await this.userModel.create(userData);
    return user;
  }

  async getUser(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }
}
