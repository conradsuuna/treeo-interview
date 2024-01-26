import { Table, Column, Model, ForeignKey, IsUrl, BelongsTo } from 'sequelize-typescript';
import { Post } from './post.model';

@Table
export class Image extends Model {
    @IsUrl
    @Column({ allowNull: false })
    image_path: string;

    @ForeignKey(() => Post)
    @Column
    post_id: number;

    @BelongsTo(() => Post)
    post: Post;
}