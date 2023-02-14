import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { GuardTypeEnum } from '../../common/constants/guard-type.enum';
import { ConfigType } from '@nestjs/config';
import { MyJwtPayload, RequestPayload } from '../model/jwt-payload.interface';
import { JwtValidationResponse } from '../model/jwt-validation.response';
import { Reflector } from '@nestjs/core';
import configuration from '../../config/configuration';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtRefreshAuthGuard
  extends AuthGuard(GuardTypeEnum.JwtRefresh)
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return super.canActivate(context);
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  GuardTypeEnum.JwtRefresh,
) {
  constructor(
    private userService: UserService,
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: config.auth.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: MyJwtPayload,
  ): Promise<JwtValidationResponse> {
    const user = await this.userService.findOneByEmail(payload.sub);
    const accessToken = '';
    const refreshToken = req.headers['authorization'].split(' ')[1] ?? '';
    const requestPayload: RequestPayload = {
      ...payload,
      accessToken,
      refreshToken,
      user,
    };

    return new JwtValidationResponse(requestPayload);
  }
}
