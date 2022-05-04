import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from '@modules/auth/contracts/auth.service.interface';
import { LoginRequestDto, LoginResponseDto } from '@modules/user/dto/login.dto';
import { InvalidCredentialException } from '@core/exceptions/business-logic/invalid-credential.exception';
import { InvalidCredentialHttpException } from '@core/exceptions/http/invalid-credential.exception';
import { IUserService } from '@modules/user/contracts/user.service.interface';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@modules/user/dto/register.dto';
import { UserDto } from '@modules/user/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    try {
      const loginRes: LoginResponseDto = await this.authService.login(
        loginRequestDto,
      );
      return loginRes;
    } catch (error: any) {
      if (error instanceof InvalidCredentialException) {
        throw new InvalidCredentialHttpException();
      }
    }
  }

  @Post('')
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const user: UserDto = await this.userService.create(registerRequestDto);
    return { user };
  }
}
