import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './guard/jwt-auth.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { JwtRefreshStrategy } from './guard/jwt-refresh.strategy';
import { AuthController } from './rest/auth.controller';
import { SmsService } from './sms/sms.service';
import configuration from '../config/configuration';
import { HttpModule } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    UserModule,
    CacheModule.register(),
    HttpModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: async (config: ConfigType<typeof configuration>) => ({
        timeout: Number(config.http.timeout),
        maxRedirects: Number(config.http.maxRedirects),
      }),
    }),
  ],
  providers: [
    AuthService,
    SmsService,
    JwtStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
