import { PostDto } from '@modules/post/dto/post.dto';
import { CreatePostRequestDto } from '@modules/post/dto/create-post.dto';
import { ListPostDto } from '@modules/post/dto/list-post.dto';

export interface IPostService {
  create(createPostDto: CreatePostRequestDto, userId: string): Promise<PostDto>;
  listPosts(listPostsDto: ListPostDto): Promise<PostDto[]>;
  likePost(userId: string, postId: string): Promise<void>;
}
export const IPostService = Symbol('IPostService');
