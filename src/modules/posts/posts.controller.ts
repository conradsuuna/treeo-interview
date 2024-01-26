import { Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Patch('/toggle-post-view-status/:postId')
  async togglePostViewStatus(@Param('postId') postId: string, @Req() req: any){
    return await this.postsService.togglePostViewStatus(Number(postId), req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/create-post')
  async createPost(@Req() req: any){
    return await this.postsService.createPost(req.body, req.user.id);
  }

  @Get('/get-public-posts')
  async getPublicPosts(){
    return await this.postsService.getPublicPosts();
  }

  @UseGuards(AuthGuard)
  @Get('/get-user-posts')
  async getUserPosts(@Req() req: any){
    return await this.postsService.getUserPosts(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-post/:postId')
  async deletePost(@Param('postId') postId: string, @Req() req: any){
    return await this.postsService.deletePost(Number(postId), req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch('/retrieve-deleted-post/:postId')
  async retrieveDeletedPost(@Param('postId') postId: string, @Req() req: any){
    return await this.postsService.retrieveDeletedPost(Number(postId), req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/get-user-deleted-posts')
  async getUserDeletedPosts(@Req() req: any){
    return await this.postsService.getUserDeletedPosts(req.user.id);
  }
}
