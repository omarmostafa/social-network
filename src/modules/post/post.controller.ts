import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { IPostService } from '@modules/post/contracts/post.service.interface';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';
import { JwtAuthGuard } from '@modules/auth/jwt-auth-guard';
import { TransformPostInterceptor } from '@core/interceptors/transform-post.interceptor';
import { TransformResponseInterceptor } from '@core/interceptors/transform-response.interceptor';
import { Response } from '@core/types/response';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(IPostService) private readonly postService: IPostService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async create(
    @Body() createPostRequestDto: CreatePostRequestDto,
    @Request() req: any,
  ): Promise<Response<PostDto>> {
    await this.postService.create(createPostRequestDto, req.user?.id);
    return { message: 'Post created successfully ', data: null };
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformPostInterceptor)
  @UseInterceptors(TransformResponseInterceptor)
  async listPosts(): Promise<PostDto[]> {
    return this.postService.listPosts();
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async likePost(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<Response<any>> {
    await this.postService.likePost(req?.user?.id, id);
    return {
      message: 'Post liked successfully',
    };
  }
}
