import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '@modules/auth/contracts/auth.service.interface';
import { LoginRequestDto, LoginResponseDto } from '@modules/user/dto/login.dto';
import { IUserRepository } from '@modules/user/contracts/user.repository.interface';
import { UserDto } from '@modules/user/dto/user.dto';
import { InvalidCredentialException } from '@core/exceptions/business-logic/invalid-credential.exception';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user: UserDto = await this.userRepository.findByUserName(
      loginDto.username,
    );
    if (!user) throw new InvalidCredentialException();

    if (!(await compare(loginDto.password, user.password)))
      throw new InvalidCredentialException();

    const token: string = await this.jwtService.signAsync({
      ...user,
    });
    return {
      token,
      user,
    };
  }
}
