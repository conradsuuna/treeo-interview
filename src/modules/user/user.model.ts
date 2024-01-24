import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ allowNull: false })
  first_name: string;

  @Column({ allowNull: false })
  last_name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ defaultValue: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
