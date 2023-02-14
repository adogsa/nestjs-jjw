import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './rest/user.controller';
import { DB1_NANE } from '../config/mikroorm.config';
import { User } from './repository/user.entity';
import { TokenService } from '../auth/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([User], DB1_NANE)],
  providers: [UserService, TokenService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
