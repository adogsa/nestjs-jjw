import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRepository } from './repository/user.repository';
import { DB1_NANE } from '../config/mikroorm.config';
import { User } from './repository/user.entity';
import { LoginParam, UserParam } from './rest/param/loginParam';
import {
  ErrUserAlreadyExists,
  ErrUserNotCreated,
  ErrUserNotFound,
  ErrUserNotUpdate,
} from './user.error';
import { TokenService } from '../auth/token/token.service';
import { JwtSet } from '../auth/model/jwt-set';
import { ErrUnauthorized } from '../auth/auth.error';
import configuration from '../config/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenSvc: TokenService,
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
    @InjectRepository(User, DB1_NANE)
    private readonly userRepository: UserRepository,
  ) {}

  async joinUser(param: UserParam): Promise<JwtSet> {
    const checkUser = await this.userRepository.findOne({ email: param.email });
    if (checkUser) {
      throw new ErrUserAlreadyExists();
    }

    // TODO 전화번호 인증??

    // throw new ErrUserNotCreated();

    try {
      const user = await this.userRepository.create(param);
      // await this.userRepository.persistAndFlush(param);

      const token = await this.tokenSvc.createToken({ email: param.email });
      user.accessToken = token.accessToken;
      user.refreshToken = token.refreshToken;
      await this.userRepository.upsert(user);
      return token;
    } catch (e) {
      console.log(e);
      throw new ErrUserNotCreated(e.message);
    }
  }

  async login(param: LoginParam, user: User): Promise<JwtSet> {
    try {
      const token = await this.tokenSvc.createToken({ email: param.email });
      user.accessToken = token.accessToken;
      user.refreshToken = token.refreshToken;
      await this.userRepository.upsert(user);
      return token;
    } catch (e) {
      throw new ErrUserNotUpdate();
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository
      .findOneOrFail({ email: email })
      .catch(() => {
        throw new ErrUserNotFound(email);
      });
  }

  async update(user: User) {
    try {
      await this.userRepository.upsert(user);
    } catch (e) {
      new ErrUserNotUpdate();
    }
  }

  async replaceToken(
    email: string,
    user: User,
    refreshToken: string,
  ): Promise<JwtSet> {
    if (!user.refreshToken || user.refreshToken != refreshToken)
      throw new ErrUnauthorized(`${email}: not valid refreshToken`);

    const accessExpire = this.config.auth.accessTokenExpirationTime;
    const refreshExpire = this.config.auth.refreshTokenExpirationTime;
    const newJwtSet = this.tokenSvc.issueJwtSet(
      { email: email },
      accessExpire,
      refreshExpire,
    );

    user.accessToken = newJwtSet.accessToken;
    user.refreshToken = newJwtSet.refreshToken;
    await this.update(user);
    return newJwtSet;
  }
}
