import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from '@core/database/database.config';
import { appConfig } from '@core/config';
import { MediaModule } from '@modules/media/media.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth-module';
import { PostModule } from '@modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig, dbConfiguration],
      isGlobal: true,
    }),
    MediaModule,
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
