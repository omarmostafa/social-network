import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostDto } from '@modules/post/dto/post.dto';
import { Response } from '@core/types/response';

@Injectable()
export class TransformPostInterceptor<T>
  implements NestInterceptor<T, Response<PostDto[]>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<PostDto[]>> {
    return next.handle().pipe(
      map((posts: PostDto[]) => {
        return {
          message: 'posts listed successfully',
          data: posts.map((post) => {
            return {
              id: post.id,
              content: post.content,
              media: post.media,
              numberOfLikes: post.numberOfLikes,
              tag: {
                id: post?.tag?.id,
                name: post?.tag?.name,
              },
              user: {
                id: post?.user?.id,
                name: post?.user?.name,
                media: post?.user?.media,
              },
              createdAt: post?.createdAt,
            };
          }),
        };
      }),
    );
  }
}
