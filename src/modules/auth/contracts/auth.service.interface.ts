import { LoginRequestDto, LoginResponseDto } from '@modules/user/dto/login.dto';

export interface IAuthService {
  login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
}
export const IAuthService = Symbol('IAuthService');
