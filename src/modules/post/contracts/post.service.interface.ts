import { PostDto } from '@modules/post/dto/post.dto';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';

export interface IPostService {
  create(createPostDto: CreatePostRequestDto, userId: string): Promise<PostDto>;
  listPosts(): Promise<PostDto[]>;
  likePost(userId: string, postId: string): Promise<void>;
}
export const IPostService = Symbol('IPostService');
