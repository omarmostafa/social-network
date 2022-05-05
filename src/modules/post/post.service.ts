import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '@modules/post/contracts/post.repository.interface';
import { IPostService } from '@modules/post/contracts/post.service.interface';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject(IPostRepository) private readonly postRepository: IPostRepository,
  ) {}

  async create(
    createPostDto: CreatePostRequestDto,
    userId: string,
  ): Promise<PostDto> {
    return this.postRepository.create(createPostDto, userId);
  }

  async listPosts(): Promise<PostDto[]> {
    return this.postRepository.list();
  }

  async likePost(userId: string, postId: string): Promise<void> {
    const isPostLiked: boolean = await this.postRepository.checkIfPostIsLiked(
      userId,
      postId,
    );
    if (!isPostLiked) {
      await this.postRepository.like(userId, postId);
      return;
    }
    await this.postRepository.unlike(userId, postId);
  }
}
