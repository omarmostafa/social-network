import { Module } from '@nestjs/common';
import { DatabaseModule } from '@core/database/database.module';
import { userProviders } from '@modules/user/user.providers';
import { AuthModule } from '@modules/auth/auth-module';
import { UserController } from '@modules/user/user.controller';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { authProviders } from '@modules/auth/auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { usernameUnique } from '@core/validators/usernameUnique';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: '200d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserRepository,
    ...authProviders,
    usernameUnique,
  ],
})
export class UserModule {}
