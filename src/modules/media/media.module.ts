import { Module } from '@nestjs/common';
import { DatabaseModule } from '@core/database/database.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { mediaProviders } from './media.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MediaController],
  providers: [MediaService, ...mediaProviders],
})
export class MediaModule {}
