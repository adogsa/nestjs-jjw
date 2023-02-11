import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyTestModule } from './my-test/my-test.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmAsyncDB1Options } from './config/mikroorm.config';
import { ENVS_DIR_PATH } from './envs/envs-dir-path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`${ENVS_DIR_PATH}/../src/envs/.env.sample`],
      isGlobal: true, // don't need to import ConfigModule in other modules
    }),
    MyTestModule,
    MikroOrmModule.forRootAsync(mikroOrmAsyncDB1Options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
