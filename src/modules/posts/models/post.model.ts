import { Table, Column, Model, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Image } from './image.model';
import { User } from '../../user/user.model';

@Table
export class Post extends Model {
    @Column({ allowNull: false })
    title: string;

    @Column({ allowNull: false })
    body: string;

    @Column({ allowNull: true })
    metadata: string;

    @Column({ allowNull: true })
    tag: string;

    @Column({ defaultValue: true })
    is_public: boolean;

    @ForeignKey(() => User)
    @Column
    poster_id: number;

    @Column({ allowNull: true })
    lifespan: number;

    @Column
    can_disappear: boolean;

    @Column({ defaultValue: false })
    is_deleted: boolean;

    @Column({ allowNull: true })
    deleted_at: Date;

    @HasMany(() => Image)
    images: Image[];

    @BelongsTo(() => User)
    user: User;
}
