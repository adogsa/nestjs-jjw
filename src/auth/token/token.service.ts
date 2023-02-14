import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { ConfigType } from '@nestjs/config';
import { MyJwtPayload } from '../model/jwt-payload.interface';
import { JwtSet } from '../model/jwt-set';

interface createTokenArgs {
  email: string;
}

@Injectable()
export class TokenService {
  constructor(
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
    private jwtSvc: JwtService,
  ) {}

  async createToken(args: createTokenArgs): Promise<JwtSet> {
    const accessExpire = this.config.auth.accessTokenExpirationTime;
    const refreshExpire = this.config.auth.refreshTokenExpirationTime;
    return this.issueJwtSet(args, accessExpire, refreshExpire);
  }

  public issueJwtSet(
    args: createTokenArgs,
    accessTokenExpireTime: string,
    refreshTokenExpireTime: string,
  ) {
    const accessToken = this.issueToken(
      args,
      this.config.auth.accessTokenSecret,
      accessTokenExpireTime,
    );
    const refreshToken = this.issueToken(
      args,
      this.config.auth.refreshTokenSecret,
      refreshTokenExpireTime,
    );
    return new JwtSet(
      'Bearer',
      accessToken,
      accessTokenExpireTime,
      refreshToken,
      refreshTokenExpireTime,
    );
  }

  private issueToken(
    args: createTokenArgs,
    secret: string,
    expiresTime: string,
  ): string {
    const payload: MyJwtPayload = {
      jti: uuidv4(),
      sub: args.email,
    };

    return this.jwtSvc.sign(payload, {
      secret,
      expiresIn: expiresTime,
    });
  }
}
