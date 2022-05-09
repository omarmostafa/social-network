import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository } from '@modules/post/contracts/post.repository.interface';
import { IPostService } from '@modules/post/contracts/post.service.interface';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';
import { ListPostDto } from '@modules/post/dto/list-post.dto';

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

  async listPosts(listPostsDto: ListPostDto): Promise<PostDto[]> {
    return this.postRepository.list(listPostsDto);
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
