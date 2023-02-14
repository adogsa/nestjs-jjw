import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/repository/user.entity';
import { ErrUnauthorized } from './auth.error';
import { RequestPayload } from './model/jwt-payload.interface';
import { JwtSet } from './model/jwt-set';

@Injectable()
export class AuthService {
  constructor(private readonly userSvc: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userSvc.findOneByEmail(email);
    if (user.password == password) {
      return user;
    } else {
      throw new ErrUnauthorized();
    }
  }

  async refreshToken(payload: RequestPayload): Promise<JwtSet> {
    return await this.userSvc.replaceToken(
      payload.sub,
      payload.user,
      payload.refreshToken,
    );
  }

  // public isExpiredToken(oldJwtPayload: RequestPayload): boolean {
  //   if (!oldJwtPayload.exp) {
  //     throw new ErrValidToken();
  //   }
  //
  //   //토큰 교체 중 일수도 있어서 여유 시간 추가
  //   const AddTimeForTokenReplaceTime = 5000;
  //   return oldJwtPayload.exp * 1000 + AddTimeForTokenReplaceTime < Date.now();
  // }
}
