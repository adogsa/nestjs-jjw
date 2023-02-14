import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './guard/jwt-auth.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { JwtRefreshStrategy } from './guard/jwt-refresh.strategy';
import { AuthController } from './rest/auth.controller';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
