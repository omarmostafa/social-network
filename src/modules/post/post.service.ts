import { Inject, Injectable } from '@nestjs/common';
import {IPostRepository} from "@modules/post/contracts/post.repository.interface";
import {IPostService} from "@modules/post/contracts/post.service.interface";

@Injectable()
export class PostService implements IPostService{
  constructor(
      @Inject(IPostRepository) private readonly postRepository: IPostRepository,
  ) {}

}
