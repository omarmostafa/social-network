import {Controller, Inject} from '@nestjs/common';
import {IPostService} from "@modules/post/contracts/post.service.interface";

@Controller('media')
export class PostController {
  constructor(
      @Inject(IPostService) private readonly postService: IPostService,
  ) {}}
