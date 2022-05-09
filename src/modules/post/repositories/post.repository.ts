import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '@modules/post/entities/post.entity';
import { IPostRepository } from '@modules/post/contracts/post.repository.interface';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';
import { ListPostDto } from '@modules/post/dto/list-post.dto';
import { Tag } from '@modules/post/entities/tag.entity';
import {LIMIT} from "@core/constants/constants";

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postgresPostRepository: Repository<Post>,
    @Inject('TAG_REPOSITORY')
    private readonly postgresTagRepository: Repository<Tag>,
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

  async list(listPostsDto: ListPostDto): Promise<PostDto[]> {
    const posts = await this.postgresPostRepository.createQueryBuilder();
    if (listPostsDto.tag) {
      const tags: Tag[] = await this.postgresTagRepository.find({
        name: listPostsDto.tag,
      });
      const tagIds: string[] = tags.map((tag) => tag.id);
      posts.where(`"tagId" IN(:...ids)`, { ids: tagIds });
    }
    if (listPostsDto.userId) {
      posts.where({userId: listPostsDto.userId})
    }
    if (listPostsDto.page) {
      posts.skip((listPostsDto.page -1) * LIMIT)
    }
    if (listPostsDto.sort) {
      posts.orderBy(`"${listPostsDto.sort_by}"`, listPostsDto.sort || 'ASC');
    }
    return posts.limit(LIMIT).getMany();
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
