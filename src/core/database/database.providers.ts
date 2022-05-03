import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../constants/constants';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) =>
      createConnection(configService.get('database')),
    inject: [ConfigService],
  },
];
