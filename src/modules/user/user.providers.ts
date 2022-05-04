import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { User } from '@modules/user/entities/user.entity';
import { DATABASE_CONNECTION } from '@core/constants/constants';
import { IUserRepository } from '@modules/user/contracts/user.repository.interface';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { IUserService } from '@modules/user/contracts/user.service.interface';
import { UserService } from '@modules/user/user.service';

export const userProviders: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: IUserService,
    useClass: UserService,
  },
];
