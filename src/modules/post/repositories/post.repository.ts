import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '@modules/post/entities/post.entity';
import { IPostRepository } from '@modules/post/contracts/post.repository.interface';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postgresPostRepository: Repository<Post>,
  ) {}

  async create(
    createPostDto: CreatePostRequestDto,
    userId: string,
  ): Promise<PostDto> {
    return this.postgresPostRepository.save({
      ...createPostDto,
      userId,
    });
  }

  async list(): Promise<PostDto[]> {
    return this.postgresPostRepository.find();
  }

  async checkIfPostIsLiked(userId: string, postId: string): Promise<boolean> {
    const like: number = await this.postgresPostRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.likes', 'users')
      .where('"users"."id" = :userId', { userId: userId })
      .andWhere('"posts"."id" = :postId', { postId: postId })
      .getCount();
    return Boolean(like);
  }

  async like(userId: string, postId: string): Promise<void> {
    await this.postgresPostRepository
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(postId)
      .add(userId);
    await this.postgresPostRepository
      .createQueryBuilder()
      .update()
      .set({ numberOfLikes: () => '"numberOfLikes" + 1' })
      .execute();
  }
  async unlike(userId: string, postId: string): Promise<void> {
    await this.postgresPostRepository
      .createQueryBuilder()
      .relation(Post, 'likes')
      .of(postId)
      .remove(userId);
    await this.postgresPostRepository
      .createQueryBuilder()
      .update()
      .set({ numberOfLikes: () => '"numberOfLikes" - 1' })
      .execute();
  }
}
