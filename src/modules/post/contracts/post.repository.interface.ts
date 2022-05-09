import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { PostDto } from '@modules/post/dto/post.dto';
import { ListPostDto } from '@modules/post/dto/list-post.dto';

export interface IPostRepository {
  create(createPostDto: CreatePostRequestDto, userId: string): Promise<PostDto>;
  list(listPostsDto: ListPostDto): Promise<PostDto[]>;
  checkIfPostIsLiked(userId: string, postId: string): Promise<boolean>;
  like(userId: string, postId: string): Promise<void>;
  unlike(userId: string, postId: string): Promise<void>;
}
export const IPostRepository = Symbol('IPostRepository');
