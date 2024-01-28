import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { User } from '../user/user.model';
import { Image } from './models/image.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PostsService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    @InjectModel(Image)
    private readonly imageModel: typeof Image,
  ) {}

  async togglePostViewStatus(
    postId: number,
    userId: number,
  ): Promise<Post | any> {
    try {
      const post = await this.postModel.findOne({
        where: { id: postId, poster_id: userId },
      });
      if (!post) {
        return {
          message: 'Post not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return await post.update({ is_public: !post.is_public });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPost(postData: any, userId: number): Promise<any> {
    const transaction = await this.sequelize.transaction();

    try {
      const { images, ...postInfo } = postData;
      if (postData.lifespan) {
        postInfo['lifespan'] = postData.lifespan;
        postInfo['can_disappear'] = true;
      }
      postInfo['poster_id'] = userId;

      const post = await this.postModel.create(postInfo, { transaction });

      if (images) {
        // bulk create
        const imageObjects = images.map((image: any) => ({
          image_path: image,
          post_id: post.id,
        }));
        await this.imageModel.bulkCreate(imageObjects, { transaction });
      }

      // Commit the transaction
      await transaction.commit();

      return {
        message: 'Post created successfully',
        status: HttpStatus.OK,
        post,
      };
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw new Error(error);
    }
  }

  async getPublicPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({
        where: { is_public: true, is_deleted: false },
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
          {
            model: Image,
            attributes: ['id', 'image_path'],
          },
        ],
      });
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({
        where: { poster_id: userId, is_deleted: false },
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
          {
            model: Image,
            attributes: ['id', 'image_path'],
          },
        ],
      });
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePost(postId: number, userId: number): Promise<any> {
    try {
      const post = await this.postModel.findOne({
        where: { id: postId, poster_id: userId, is_deleted: false },
      });
      if (!post) {
        return {
          message: 'Post not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      await post.update({ is_deleted: true, deleted_at: new Date() });
      return {
        message: 'Post deleted successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async retrieveDeletedPost(postId: number, userId: number): Promise<any> {
    try {
      const post = await this.postModel.findOne({
        where: { id: postId, poster_id: userId, is_deleted: true },
      });
      if (!post) {
        return {
          message: 'Post not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      const now = new Date().getTime();
      const deletedAt = new Date(post.deleted_at).getTime();
      // Calculate the time difference in milliseconds
      const timeDiff = Math.abs(now - deletedAt);
      // Convert time difference to hours
      const hoursDifference = timeDiff / (1000 * 60 * 60);
      if (hoursDifference > 24) {
        return {
          message: 'Post cannot be retrieved after 24 hours',
          status: HttpStatus.BAD_REQUEST,
        };
      }
      await post.update({ is_deleted: false, deleted_at: null });
      return {
        message: 'Post retrieved successfully',
        status: HttpStatus.OK,
        post,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserDeletedPosts(userId: number): Promise<Post[]> {
    try {
      const posts = await this.postModel.findAll({
        where: { poster_id: userId, is_deleted: true },
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
          {
            model: Image,
            attributes: ['id', 'image_path'],
          },
        ],
      });
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }
}
