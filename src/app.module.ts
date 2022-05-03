import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from './core/database/database.config';
import { appConfig } from './core/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig, dbConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
