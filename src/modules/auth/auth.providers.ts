import { Provider } from '@nestjs/common';
import { IAuthService } from '@modules/auth/contracts/auth.service.interface';
import { AuthService } from '@modules/auth/auth.service';

export const authProviders: Provider[] = [
  {
    provide: IAuthService,
    useClass: AuthService,
  },
];
