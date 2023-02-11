import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [configuration],
    //   envFilePath: [
    //     `${ENVS_DIR_PATH}/.env${process.env.DOT_ENV_SUFFIX ? '.' + process.env.DOT_ENV_SUFFIX : ''}`,
    //     `${ENVS_DIR_PATH}/.env.sample`,
    //   ],
    //   isGlobal: true, // don't need to import ConfigModule in other modules
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
