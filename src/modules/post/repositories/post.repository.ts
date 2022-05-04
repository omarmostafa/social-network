import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Post} from "@modules/post/entities/post.entity";
import {IPostRepository} from "@modules/post/contracts/post.repository.interface";

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postgresPostRepository: Repository<Post>,
  ) {}
}
