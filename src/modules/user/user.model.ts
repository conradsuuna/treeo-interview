import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../posts/models/post.model';

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

  @HasMany(() => Post)
  posts: Post[];
}
