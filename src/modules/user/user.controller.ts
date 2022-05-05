import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { IAuthService } from '@modules/auth/contracts/auth.service.interface';
import { LoginRequestDto, LoginResponseDto } from '@modules/user/dto/login.dto';
import { InvalidCredentialException } from '@core/exceptions/business-logic/invalid-credential.exception';
import { InvalidCredentialHttpException } from '@core/exceptions/http/invalid-credential.exception';
import { IUserService } from '@modules/user/contracts/user.service.interface';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@modules/user/dto/register.dto';
import { Response } from '@core/types/response';
import { TransformResponseInterceptor } from '@core/interceptors/transform-response.interceptor';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IAuthService) private readonly authService: IAuthService,
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<Response<LoginResponseDto>> {
    try {
      const loginRes: LoginResponseDto = await this.authService.login(
        loginRequestDto,
      );
      return {
        message: 'User Logged in succesfully',
        data: loginRes,
      };
    } catch (error: any) {
      if (error instanceof InvalidCredentialException) {
        throw new InvalidCredentialHttpException();
      }
    }
  }

  @Post('')
  @UseInterceptors(TransformResponseInterceptor)
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<Response<RegisterResponseDto>> {
    await this.userService.create(registerRequestDto);
    return {
      message: 'User Registered Successfully',
      data: null,
    };
  }
}
