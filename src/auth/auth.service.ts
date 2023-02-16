import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/repository/user.entity';
import { ErrUnauthorized } from './auth.error';
import { RequestPayload } from './model/jwt-payload.interface';
import { JwtSet } from './model/jwt-set';
import * as sha256 from 'crypto-js/sha256';

@Injectable()
export class AuthService {
  constructor(private readonly userSvc: UserService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userSvc.findOneByEmail(email);
    if (user.password === sha256(password).toString()) {
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
}
