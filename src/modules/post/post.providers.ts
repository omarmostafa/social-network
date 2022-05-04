import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@core/constants/constants';
import {Post} from "@modules/post/entities/post.entity";
import {IPostRepository} from "@modules/post/contracts/post.repository.interface";
import {PostRepository} from "@modules/post/repositories/post.repository";
import {IPostService} from "@modules/post/contracts/post.service.interface";
import {PostService} from "@modules/post/post.service";

export const postProviders: Provider[] = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: IPostRepository,
    useClass: PostRepository,
  },
  {
    provide: IPostService,
    useClass: PostService,
  },
];
