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
export class JwtAuthGuard
  extends AuthGuard(GuardTypeEnum.Jwt)
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
export class JwtStrategy extends PassportStrategy(Strategy, GuardTypeEnum.Jwt) {
  constructor(
    private userService: UserService,
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.accessTokenSecret,
      // passReqToCallback: true,
    });
  }

  async validate(payload: MyJwtPayload): Promise<JwtValidationResponse> {
    const user = await this.userService.findOneByEmail(payload.sub);
    const accessToken = '';
    const refreshToken = '';
    const requestPayload: RequestPayload = {
      ...payload,
      accessToken,
      refreshToken,
      user,
    };

    return new JwtValidationResponse(requestPayload);
  }
}
