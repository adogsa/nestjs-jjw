import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmAsyncDB1Options } from './config/mikroorm.config';
import { ENVS_DIR_PATH } from './envs/envs-dir-path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`${ENVS_DIR_PATH}/../src/envs/.env.sample`],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MikroOrmModule.forRootAsync(mikroOrmAsyncDB1Options),
  ],
})
export class AppModule {}
