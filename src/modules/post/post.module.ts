import { Module } from '@nestjs/common';
import { DatabaseModule } from '@core/database/database.module';
import { PostController } from '@modules/post/post.controller';
import { postProviders } from '@modules/post/post.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postProviders],
})
export class PostModule {}
