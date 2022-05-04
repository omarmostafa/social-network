import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '@core/constants/constants';
import { Media } from './entities/media.entity';

export const mediaProviders: Provider[] = [
  {
    provide: 'MEDIA_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Media),
    inject: [DATABASE_CONNECTION],
  },
];
