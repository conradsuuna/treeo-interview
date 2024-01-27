import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript'; 


@Injectable()
export class AppService {
  constructor(
    private sequelize: Sequelize,
    @Inject('MomentWrapper')
    private momentWrapper: moment.Moment
    ) {}
}
