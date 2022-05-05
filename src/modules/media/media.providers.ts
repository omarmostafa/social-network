import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@core/constants/constants';
import { Media } from './entities/media.entity';
import { IMediaRepository } from '@modules/media/contracts/media.repository.interface';
import { MediaRepository } from '@modules/media/repositories/media.repository';
import { IMediaService } from '@modules/media/contracts/media.service.interface';
import { MediaService } from '@modules/media/media.service';
import { IMediaProvider } from '@modules/media/contracts/media.provider.interface';
import { LocalMediaProvider } from '@modules/media/providers/local-media.provider';

export const mediaProviders: Provider[] = [
  {
    provide: 'MEDIA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Media),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: IMediaRepository,
    useClass: MediaRepository,
  },
  {
    provide: IMediaService,
    useClass: MediaService,
  },
  {
    provide: IMediaProvider,
    useClass: LocalMediaProvider,
  },
];
